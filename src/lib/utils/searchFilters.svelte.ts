import fuzzysort from "fuzzysort";

export class SearchFilter<T extends Record<string, any>> {
  items = $state<T[]>([]);
  private tempStorage: T[] = [];
  private values: string[] = []; // only for list not object
  private key: string | null = null;

  prepareSearch(key: string, items: T[]) {
    this.tempStorage = [...items];
    this.items = [...items];
    // this.values = this.items.map((item) => item[key]);
    this.key = key;
    console.log(this.values);
  }

  resetSearch(): T[] {
    // this.values = [];
    let output = this.tempStorage;
    this.items = [];
    this.tempStorage = [];
    return output;
  }

  onSearch(query: string): T[] {
    if (this.key) {
      return this.fuzzyFilter(query, this.key);
    } else {
      return this.tempStorage;
    }
  }

  // returns indexs of matching strings
  fuzzyFindIndexes(list: string[], query: string): number[] {
    if (!query.trim()) {
      return list.map((_, i) => i);
    }

    const searchable = list.map((value, index) => ({
      value,
      index,
    }));

    return fuzzysort
      .go(query, searchable, { key: "value" })
      .map((result) => result.obj.index);
  }

  fuzzyFilter(query: string, key: string): any[] {
    if (!query.trim()) {
      return [...this.tempStorage];
    }

    return fuzzysort
      .go(query, this.items, {
        key,
        threshold: -10000, // Optional
      })
      .map((result) => result.obj);
  }
}

export const searchFilter = new SearchFilter();

export class Mf {
    private index: number;
    private id: number;
    private name: string;
    private amount: number;
    private marketVal: number;
    isProfit: boolean;

    setIndex(index: number) {
      this.index = index;
    }
    setId(id: number) {
      this.id = id;
    }
    setName(name: string) {
      this.name = name;
    }
    setAmount(amount: number) {
      this.amount = amount;
    }
    setMarketVal(marketVal: number) {
      this.marketVal = marketVal;
    }
    setProfit(isProfit: boolean) {
      this.isProfit = isProfit;
    }

    getId(): number {
      return this.id;
    }
    getAmount(): number {
      return this.amount;
    }
    getMarketVal(): number {
      return this.marketVal;
    }
  }


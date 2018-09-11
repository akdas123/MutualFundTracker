export class Mf {
    private index: number;
    private id: number;
    private name: string;
    private amount: number;
    private date: string;
    private marketVal: number;
    private dayGain: number;
    private totalGain: number;
    isProfit: boolean;
    isTotalProfit: boolean;

    setIndex(index: number) {
      this.index = index;
    }
    setId(id: number) {
      this.id = id;
    }
    setName(name: string) {
      this.name = name;
    }
    setDate(date: string) {
      this.date = date;
    }
    setAmount(amount: number) {
      this.amount = amount;
    }
    setMarketVal(marketVal: number) {
      this.marketVal = marketVal;
    }
    setDayGain(dayGain: number) {
      this.dayGain = dayGain;
    }
    setTotalGain(totalGain: number) {
      this.totalGain = totalGain;
    }
    setProfit(isProfit: boolean) {
      this.isProfit = isProfit;
    }
    setTotalProfit(isTotalProfit: boolean) {
      this.isTotalProfit = isTotalProfit;
    }

    getId(): number {
      return this.id;
    }
    getAmount(): number {
      return this.amount;
    }
    getDate(): number {
      return this.date;
    }
    getMarketVal(): number {
      return this.marketVal;
    }
    getDayGain(): number {
      return this.dayGain;
    }
  }


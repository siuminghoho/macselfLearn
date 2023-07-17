function deposit(this: any, amount: number) {
    this.total += amount;
    console.log(`Amount of ${amount} is deposited to ${this.name}`)
    return this.total
}

const gordonAcc = {total: 3000, name: "gordon"}
const depositToGordon = deposit.bind(gordonAcc)

console.log(gordonAcc)
depositToGordon(1000)

console.log(gordonAcc)
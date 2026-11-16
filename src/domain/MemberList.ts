import type { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(_documentId: string, _fee: number): void {
    // TODO: cambiar la cuota del socio con ese documento
    for (let i=0; i<this.#items.length; i++){
      if (this.#items[i].documentId===_documentId){
        this.#items[i].monthlyFee = _fee;
        return;
      }
    }
    throw new Error("No existe socio con ese documento");
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    // TODO: sumar las cuotas de los socios con el descuento aplicado
    let suma = 0;
    for (let i=0; i<this.#items.length; i++){
      const descuento = this.#items[i].monthlyFee*(this.#items[i].discount/100);
      suma+=this.#items[i].monthlyFee-descuento;
    }
    return suma;
  }
}

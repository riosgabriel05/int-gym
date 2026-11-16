import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("Suma correcta", () => {
    let member2 = new Member({
      name: "Ana Pérez",
      documentId: "12345670",
      plan: "full",
      monthlyFee: 1000,
    });
    list.add(member);
    list.add(member2);
    member.discount = 0;
    member2.discount = 10;
    expect(list.totalDiscounted()).toEqual(2400);
  });

  test("Actualizacion correcta", () => {
    let member2 = new Member({
      name: "Ana Pérez",
      documentId: "12345670",
      plan: "full",
      monthlyFee: 1000,
    });
    list.add(member);
    list.add(member2);
    member.discount = 0;
    member2.discount = 10;
    list.updateFee("12345670",800);
    expect(member2.monthlyFee).toEqual(800);
  });

  test("No existe miembro con ese documento", () => {
    list.add(member);
    expect(() => list.updateFee("2442242",444)).toThrow();
  });

});

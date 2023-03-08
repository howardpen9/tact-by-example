var w=Object.defineProperty;var y=(s,e,t)=>e in s?w(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var A=(s,e,t)=>(y(s,typeof e!="symbol"?e+"":e,t),t);import{S as I,i as B,s as b,I as C,ac as m}from"../../../../chunks/index-1d4083c1.js";import{d as a,s as l}from"../../../../chunks/store-ab11a47e.js";import{d as f,g as u}from"../../../../chunks/helpers-be3eeda0.js";const p="# Integers\n\nTact supports a number of primitive data types that are tailored for smart contract use.\n\n`Int` is the primary number type. Math in smart contracts is always done with integers and no floating points.\n\nThe runtime type `Int` is *always* 257-bit signed, so all runtime calculations are done at 257-bit. This should be enough for everything as it's large enough to hold the number of atoms in the universe.\n\nWhen encoding `Int` to persistent state, we will usually use smaller representations than 257-bit to reduce storage cost. The persistent state size is specified in every declaration of a state variable after the `as` keyword.",Q=`import "@stdlib/deploy";

contract Integers with Deployable {
 
    // integers can be persisted in state in various sizes
    i1: Int as int257 = 3001;   // range -2^256 to 2^256 - 1 (takes 257 bit = 32 bytes + 1 bit)
    i2: Int as uint256;         // range 0 to 2^256 - 1 (takes 256 bit = 32 bytes)
    i3: Int as int256 = 17;     // range -2^255 to 2^255 - 1 (takes 256 bit = 32 bytes)
    i4: Int as uint128;         // range 0 to 2^128 - 1 (takes 128 bit = 16 bytes)
    i5: Int as int128;          // range -2^127 to 2^127 - 1 (takes 128 bit = 16 bytes)
    i6: Int as coins;           // range 0 to 2^120 - 1 (takes 120 bit = 15 bytes)
    i7: Int as uint64 = 0x1c4a; // range 0 to 18,446,744,073,709,551,615 (takes 64 bit = 8 bytes)
    i8: Int as int64 = -203;    // range -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (takes 64 bit = 8 bytes)
    i9: Int as uint32 = 0;      // range 0 to 4,294,967,295 (takes 32 bit = 4 bytes)
    i10: Int as int32 = 0;      // range -2,147,483,648 to 2,147,483,647 (takes 32 bit = 4 bytes)
    i11: Int as uint16 = 0;     // range 0 to 65,535 (takes 16 bit = 2 bytes)
    i12: Int as int16 = 0;      // range -32,768 to 32,767 (takes 16 bit = 2 bytes)
    i13: Int as uint8 = 0;      // range 0 to 255 (takes 8 bit = 1 byte)
    i14: Int as int8 = 0;       // range -128 to 127 (takes 8 bit = 1 byte)

    init() {
        self.i2 = 0x83dfd552e63729b472fcbcc8c45ebcc6691702558b68ec7527e1ba403a0f31a8;
        self.i4 = 1507998500293440234999;
        self.i5 = pow(10, 9);   // this is 10^9 = 1,000,000,000
        self.i6 = ton("1.23");  // easy to read coin balances (like cents, just with 9 decimals)
    }

    receive("show all") {
        dump(self.i1);
        dump(self.i2);
        dump(self.i3);
        dump(self.i4);
        dump(self.i5);
        dump(self.i6);
        dump(self.i7);
        dump(self.i8);
    }

    get fun result(): Int {
        return self.i1;
    }
}`;function h(s){return e=>{let t=e;t.storeUint(2490013878,32),t.storeUint(s.queryId,64)}}async function d(){const s=a.Cell.fromBase64("te6ccgECEgEAA/AAART/APSkE/S88sgLAQIBYgIDAXbQAdDTAwFxsMABkX+RcOIB+kABINdJgQELuvLgiCDXCwoggwm6IYEE/7qx8uCIgwm68uCJIkFVbwT4YQQCASAODwOe7UTQ1AH4YtIAAY4tgQEB1wDT/9L/03/UAdDSf/oA0z/SP9Mf0h/TD9IP0wfSBzAQrhCtEKwQq2wejo4w+CjXCwqDCbry4InbPOJVHds8MBAFBgL07aLt+3Ah10nCH5UwINcLH94Cklt/4CGCEJRqmLa6jqMx0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yds8f+ABwACOrfkBgvAyQsxllS8F2bB9Kyyq2RY4o0HI4fJTwjjU3mC5C/1zSrqOhds8f9sx4JEw4nAHCAB+yPhCAcx/AcoAVdBQ3oEBAc8AG8v/Gcr/F8t/BcjKf1AE+gISyz/KP8sfEsofEssPEsoPEssHEsoHyQHMye1UASb4QW8kECNfA39wUAOAQgFtbds8CQQmLds8/hQwLNs8/hQwK9s8/hQwKg0NDQsBzshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4InPFlAD+gJwAcpoI26zJW6zsZczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAKAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMBCTbPP4UMCnbPP4UMCjbPP4UMCcNDQ0MAhbbPP4UMCbbPP4UMA0NAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydACnb9yl2omhqAPwxaQAAxxbAgIDrgGn/6X/pv+oA6Gk//QBpn+kf6Y/pD+mH6Qfpg+kDmAhXCFaIVghVtg9HRxh8FGuFhUGE3XlwRO2ecW2eQQEQC5vd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkAKKBC7mAEYEcSoH/NXBUcABTAILwg9/VUuY3KbRy/LzIxF68xmkXAlWLaOx1J+G6QDoPMagJCII4Ub+u5kxkTOX3ghA7msoAUJiCEElQT4AIVTMABF8N"),e=a.Cell.fromBase64("te6cckECFAEAA/oAAQHAAQEFoB6tAgEU/wD0pBP0vPLICwMCAWIIBAIBIAYFALm93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQCnb9yl2omhqAPwxaQAAxxbAgIDrgGn/6X/pv+oA6Gk//QBpn+kf6Y/pD+mH6Qfpg+kDmAhXCFaIVghVtg9HRxh8FGuFhUGE3XlwRO2ecW2eQTBwAEXw0BdtAB0NMDAXGwwAGRf5Fw4gH6QAEg10mBAQu68uCIINcLCiCDCbohgQT/urHy4IiDCbry4IkiQVVvBPhhCQOe7UTQ1AH4YtIAAY4tgQEB1wDT/9L/03/UAdDSf/oA0z/SP9Mf0h/TD9IP0wfSBzAQrhCtEKwQq2wejo4w+CjXCwqDCbry4InbPOJVHds8MBMLCgB+yPhCAcx/AcoAVdBQ3oEBAc8AG8v/Gcr/F8t/BcjKf1AE+gISyz/KP8sfEsofEssPEsoPEssHEsoHyQHMye1UAvTtou37cCHXScIflTAg1wsf3gKSW3/gIYIQlGqYtrqOozHTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J2zx/4AHAAI6t+QGC8DJCzGWVLwXZsH0rLKrZFjijQcjh8lPCONTeYLkL/XNKuo6F2zx/2zHgkTDicBAMBCYt2zz+FDAs2zz+FDAr2zz+FDAqDw8PDQQk2zz+FDAp2zz+FDAo2zz+FDAnDw8PDgIW2zz+FDAm2zz+FDAPDwDeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQASb4QW8kECNfA39wUAOAQgFtbds8EQHOyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIMJuiGBBP+6sfLgiIMJuvLgic8WUAP6AnABymgjbrMlbrOxlzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABIAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAooELuYARgRxKgf81cFRwAFMAgvCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqAkIgjhRv67mTGRM5feCEDuaygBQmIIQSVBPgAhVM90219k=");let t=a.beginCell();t.storeRef(e),t.storeUint(0,1);const r=t.endCell();return{code:s,data:r}}const D={2:{message:"Stack undeflow"},3:{message:"Stack overflow"},4:{message:"Integer overflow"},5:{message:"Integer out of expected range"},6:{message:"Invalid opcode"},7:{message:"Type check error"},8:{message:"Cell overflow"},9:{message:"Cell underflow"},10:{message:"Dictionary error"},13:{message:"Out of gas error"},32:{message:"Method ID not found"},34:{message:"Action is invalid or not supported"},37:{message:"Not enough TON"},38:{message:"Not enough extra-currencies"},128:{message:"Null reference exception"},129:{message:"Invalid serialization prefix"},130:{message:"Invalid incoming message"},131:{message:"Constraints error"},132:{message:"Access denied"},133:{message:"Contract stopped"},134:{message:"Invalid argument"},135:{message:"Code of a contract was not found"},136:{message:"Invalid address"},137:{message:"Masterchain support is not enabled for this contract"}};class c{constructor(e,t){A(this,"address");A(this,"init");A(this,"abi",{errors:D});this.address=e,this.init=t}static async init(){return await d()}static async fromInit(){const e=await d(),t=a.contractAddress(0,e);return new c(t,e)}static fromAddress(e){return new c(e)}async send(e,t,r,n){let o=null;if(n==="show all"&&(o=a.beginCell().storeUint(0,32).storeStringTail(n).endCell()),n&&typeof n=="object"&&!(n instanceof a.Slice)&&n.$$type==="Deploy"&&(o=a.beginCell().store(h(n)).endCell()),o===null)throw new Error("Invalid message type");await e.internal(t,{...r,body:o})}async getResult(e){let t=new a.TupleBuilder;return(await e.get("result",t.build())).stack.readBigNumber()}}function E(s,e,t){let r;C(s,l,i=>t(2,r=i));let n,o;return m(l,r={markdown:p,tactCode:Q,deploy:async()=>{const i=await f.Blockchain.create(),g=await i.treasury("deployer");return n=g.getSender(),o=i.openContract(await c.fromInit()),[await o.send(g.getSender(),{value:a.toNano(1)},{$$type:"Deploy",queryId:0n})]},messages:{"show all":async()=>[await o.send(n,{value:a.toNano(1)},"show all")]},getters:{result:async()=>await o.getResult()},prev:u(import.meta.url).prev,next:u(import.meta.url).next},r),[]}class T extends I{constructor(e){super(),B(this,e,E,null,b,{})}}export{T as default};

var g=Object.defineProperty;var u=(n,e,t)=>e in n?g(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var l=(n,e,t)=>(u(n,typeof e!="symbol"?e+"":e,t),t);import{S as f,i as C,s as h,I as w,ac as I}from"../chunks/index.9fe14626.js";import{d as o,g as p,s as A}from"../chunks/store.96cf5894.js";import{d as B}from"../chunks/index.7100d5a9.js";const b="# The Deployable Trait\n\nTact doesn't support classical class inheritance, but contracts can implement *traits*. One of the commonly used traits is `Deployable`. It implements a simple receiver for the `Deploy` message which helps deploy contracts in a standard way.\n\nAll contracts are deployed by sending them a message. This can be any message, but best practice is to designate the special `Deploy` message for this purpose.\n\nThis message has a single field, `queryId`, which is provided by the deployer (normally zero). If the deploy succeeds, the contract will reply with the message `DeployOk` and echo the same `queryId` in the response.\n\nIf you're using Tact's [auto-generated](https://docs.tact-lang.org/tools/typescript#tact-contract-in-typescript) TypeScript classes to deploy, sending the deploy message should look like:\n\n```ts\nconst msg = { $$type: \"Deploy\", queryId: 0n };\n await contract.send(sender, { value: toNano(1) }, msg);\n```\n\nYou can see the implementation of the trait [here](https://github.com/tact-lang/tact/blob/main/stdlib/libs/deploy.tact). Notice that the file *deploy.tact* needs to be imported from the standard library using the `import` keyword.",v=`// this trait has to be imported
import "@stdlib/deploy";

// the Deployable trait adds a default receiver for the "Deploy" message
contract Counter with Deployable {
 
    val: Int as uint32;
 
    init() {
        self.val = 0;
    }
 
    receive("increment") {
        self.val = self.val + 1;
    }
 
    get fun value(): Int {
        return self.val;
    }
}`;function D(n){return e=>{let t=e;t.storeUint(2490013878,32),t.storeUint(n.queryId,64)}}async function m(){const n=o.Cell.fromBase64("te6ccgECEQEAAp4AART/APSkE/S88sgLAQIBYgIDApjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABAcsfye1UDgQCAVgICQL27aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEJRqmLa6jqgw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4MAAjiv5AYLwxPjXIxLt/e9be+x4M727Fi0VEb14qRKu0PJjevZVcq66lKR/2zHgkTDiBRABOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8BgHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAHAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgCAUgKCwARsK+7UTQ0gABgAgFqDA0Ac6d3Ghq0uDM5nReXqLapqzC6pCOjt7SrvTicGJk9K60rMKUnJSKctTkztSMiJSa8qrc7sLMmJCEkMMECDaWBtnm2eGMODwE87UTQ1AH4Y9IAAZTTHwEx4DD4KNcLCoMJuvLgids8EAACIAACcA=="),e=o.Cell.fromBase64("te6cckECEwEAAqgAAQHAAQEFoendAgEU/wD0pBP0vPLICwMCAWIMBAIBWAsFAgFICgYCAWoJBwINpYG2ebZ4YxEIAAIgAHOndxoatLgzOZ0Xl6i2qaswuqQjo7e0q704nBiZPSutKzClJyUinLU5M7UjIiUmvKq3O7CzJiQhJDDBABGwr7tRNDSAAGAAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSAKY0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wds88uCCyPhDAcx/AcoAAQHLH8ntVBENAvbtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQlGqYtrqOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACOK/kBgvDE+NcjEu3971t77HgzvbsWLRURvXipEq7Q8mN69lVyrrqUpH/bMeCRMOIOEgE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwPAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABAAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwBPO1E0NQB+GPSAAGU0x8BMeAw+CjXCwqDCbry4InbPBIAAnDmcEqT");let t=o.beginCell();t.storeRef(e),t.storeUint(0,1);const r=t.endCell();return{code:n,data:r}}const k={2:{message:"Stack undeflow"},3:{message:"Stack overflow"},4:{message:"Integer overflow"},5:{message:"Integer out of expected range"},6:{message:"Invalid opcode"},7:{message:"Type check error"},8:{message:"Cell overflow"},9:{message:"Cell underflow"},10:{message:"Dictionary error"},13:{message:"Out of gas error"},32:{message:"Method ID not found"},34:{message:"Action is invalid or not supported"},37:{message:"Not enough TON"},38:{message:"Not enough extra-currencies"},128:{message:"Null reference exception"},129:{message:"Invalid serialization prefix"},130:{message:"Invalid incoming message"},131:{message:"Constraints error"},132:{message:"Access denied"},133:{message:"Contract stopped"},134:{message:"Invalid argument"},135:{message:"Code of a contract was not found"},136:{message:"Invalid address"},137:{message:"Masterchain support is not enabled for this contract"}},E=[{name:"StateInit",header:null,fields:[{name:"code",type:{kind:"simple",type:"cell",optional:!1}},{name:"data",type:{kind:"simple",type:"cell",optional:!1}}]},{name:"Context",header:null,fields:[{name:"bounced",type:{kind:"simple",type:"bool",optional:!1}},{name:"sender",type:{kind:"simple",type:"address",optional:!1}},{name:"value",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"raw",type:{kind:"simple",type:"slice",optional:!1}}]},{name:"SendParameters",header:null,fields:[{name:"bounce",type:{kind:"simple",type:"bool",optional:!1}},{name:"to",type:{kind:"simple",type:"address",optional:!1}},{name:"value",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"mode",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"body",type:{kind:"simple",type:"cell",optional:!0}},{name:"code",type:{kind:"simple",type:"cell",optional:!0}},{name:"data",type:{kind:"simple",type:"cell",optional:!0}}]},{name:"Deploy",header:2490013878,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}}]},{name:"DeployOk",header:2952335191,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}}]},{name:"FactoryDeploy",header:1829761339,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}},{name:"cashback",type:{kind:"simple",type:"address",optional:!1}}]}],M=[{name:"value",arguments:[],returnType:{kind:"simple",type:"int",optional:!1,format:257}}],L=[{receiver:"internal",message:{kind:"text",text:"increment"}},{receiver:"internal",message:{kind:"typed",type:"Deploy"}}];class c{constructor(e,t){l(this,"address");l(this,"init");l(this,"abi",{types:[{name:"StateInit",header:null,fields:[]},{name:"Context",header:null,fields:[]},{name:"SendParameters",header:null,fields:[]},{name:"Deploy",header:2490013878,fields:[]},{name:"DeployOk",header:2952335191,fields:[]},{name:"FactoryDeploy",header:1829761339,fields:[]}],types:E,getters:M,receivers:L,errors:k});this.address=e,this.init=t}static async init(){return await m()}static async fromInit(){const e=await m(),t=o.contractAddress(0,e);return new c(t,e)}static fromAddress(e){return new c(e)}async send(e,t,r,s){let a=null;if(s==="increment"&&(a=o.beginCell().storeUint(0,32).storeStringTail(s).endCell()),s&&typeof s=="object"&&!(s instanceof o.Slice)&&s.$$type==="Deploy"&&(a=o.beginCell().store(D(s)).endCell()),a===null)throw new Error("Invalid message type");await e.internal(t,{...r,body:a})}async getValue(e){let t=new o.TupleBuilder;return(await e.get("value",t.build())).stack.readBigNumber()}}function Q(n,e,t){let r;w(n,A,i=>t(2,r=i));let s,a;return I(A,r={markdown:b,tactCode:v,deploy:async()=>{const i=await B.Blockchain.create(),d=await i.treasury("deployer");s=d.getSender(),a=i.openContract(await c.fromInit());const y={[d.address.toString()]:"deployer",[a.address.toString()]:"contract"};return[[a],y,[await a.send(d.getSender(),{value:o.toNano(1)},{$$type:"Deploy",queryId:0n})]]},messages:{increment:async()=>[await a.send(s,{value:o.toNano(1)},"increment")]},getters:{value:async()=>await a.getValue()},prev:p(import.meta.url).prev,next:p(import.meta.url).next},r),[]}class z extends f{constructor(e){super(),C(this,e,Q,null,h,{})}}export{z as default};

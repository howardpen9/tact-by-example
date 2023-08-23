var m=Object.defineProperty;var B=(s,e,t)=>e in s?m(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var A=(s,e,t)=>(B(s,typeof e!="symbol"?e+"":e,t),t);import{S as u,i as w,s as f,I as h,ac as C}from"../chunks/index.9fe14626.js";import{d as o,g as y,s as g}from"../chunks/store.96cf5894.js";import{d as I}from"../chunks/index.7100d5a9.js";const b=`# A Contract Deploying Another

Contracts are not necessarily only deployed by users, they can also be deployed by other contracts.

In this example, when pressing the <span class="mdButton blue">Deploy</span> button, we only deploy one contract instance - the one with constructor argument 1.

The second instance (with constructor argument 2) will be deployed by the first contract instance when it receives the \`deploy next\` message. Send this message to the first instance by pressing the <span class="mdButton grape">Send "deploy 2nd" to 1</span> button.

## Messages containing state init

The combination of the inital code and the initial data of a contract is called the *stateInit* of the contract.

When sending any message to a contract, we can attach its *stateInit* by specifying the \`code\` and \`data\` fields of the message. This will deploy the contract if it has not already been deployed. If the contract has already been deployed, these fields will be ignored.

Notice that in this example, we piggyback the deployment on the \`indentify\` message.`,v=`import "@stdlib/deploy";

// we're going to have multiple instances of this contract, each with a different seqno
contract Todo with Deployable {

    seqno: Int as uint64;
 
    // when deploying an instance, we must specify its index (sequence number)
    init(seqno: Int) {
        self.seqno = seqno;
    }

    // this message handler will just debug print the seqno so we can see when it's called
    receive("identify") {
        dump(self.seqno);
    }

    // this message handler will cause the contract to deploy the second instance
    receive("deploy 2nd") {
        let init: StateInit = initOf Todo(2);
        let address: Address = contractAddress(init);
        send(SendParameters{
            to: address,
            value: ton("0.1"),              // pay for message, the deployment and give some TON for storage
            mode: SendIgnoreErrors,
            code: init.code,                // attaching the state init will cause the message to deploy
            data: init.data,
            body: "identify".asComment()    // we must piggyback the deployment on another message
        });
    }
}`;function D(s){return e=>{let t=e;t.storeUint(2490013878,32),t.storeUint(s.queryId,64)}}function M(s){return e=>{e.storeInt(s.seqno,257)}}async function p(s){const e=o.Cell.fromBase64("te6ccgECEgEAA9UAART/APSkE/S88sgLAQIBYgIDApjQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABAcs/ye1UBAUCAVgODwBG7UTQ1AH4Y9IAAZTTPwEx4Pgo1wsKgwm68uCJgQEB1wABAdECoO2i7fsBkjB/4HAh10nCH5UwINcLH94gghCUapi2uo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAJEw4w1wBgcBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8DAKw+QEggvB2bSGJHoZfKfCmdwduN4rCPdtOz0o5Ai1EQdtvLNSE0LqOijAg2zz+FDB/2zHggvDrHm7dvPcdsbIhf27F8kb14HpdmR1M/6Waxo5e1dlp27rjAggJAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydADvvhDcts8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIghAF9eEAcogQNUQwEn8GBQRBM9s8f9sxCgsMAGQB0PQEMG0BgVI3AYAQ9A9vofLghwGBUjciAoAQ9BfIAcj0AMkBzHABygBYAYEBAc8AyQAYAAAAAGlkZW50aWZ5AcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AA0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSAIBSBARABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVozdHNkdzZYSjFxV2ZjZUVhUjhzazRuanFoTHBNRGFjTXhMelN5dXlvb1ZDgg"),t=o.Cell.fromBase64("te6cckECFAEAA98AAQHAAQEFoKRvAgEU/wD0pBP0vPLICwMCAWIJBAIBWAgFAgFIBwYAdbJu40NWlwZnM6Ly9RbVozdHNkdzZYSjFxV2ZjZUVhUjhzazRuanFoTHBNRGFjTXhMelN5dXlvb1ZDggABGwr7tRNDSAAGAAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSAKY0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wds88uCCyPhDAcx/AcoAAQHLP8ntVBMKAqDtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQlGqYtrqOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACRMOMNcBALArD5ASCC8HZtIYkehl8p8KZ3B243isI9207PSjkCLURB228s1ITQuo6KMCDbPP4UMH/bMeCC8Osebt289x2xsiF/bsXyRvXgel2ZHUz/pZrGjl7V2WnbuuMCDwwDvvhDcts8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIghAF9eEAcogQNUQwEn8GBQRBM9s8f9sxDg0RABgAAAAAaWRlbnRpZnkAZAHQ9AQwbQGBUjcBgBD0D2+h8uCHAYFSNyICgBD0F8gByPQAyQHMcAHKAFgBgQEBzwDJAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydABOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8EQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wASAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAEbtRNDUAfhj0gABlNM/ATHg+CjXCwqDCbry4ImBAQHXAAEB0dAxevM=");let a=o.beginCell();a.storeRef(t),a.storeUint(0,1),M({$$type:"Todo_init_args",seqno:s})(a);const n=a.endCell();return{code:e,data:n}}const H={2:{message:"Stack undeflow"},3:{message:"Stack overflow"},4:{message:"Integer overflow"},5:{message:"Integer out of expected range"},6:{message:"Invalid opcode"},7:{message:"Type check error"},8:{message:"Cell overflow"},9:{message:"Cell underflow"},10:{message:"Dictionary error"},13:{message:"Out of gas error"},32:{message:"Method ID not found"},34:{message:"Action is invalid or not supported"},37:{message:"Not enough TON"},38:{message:"Not enough extra-currencies"},128:{message:"Null reference exception"},129:{message:"Invalid serialization prefix"},130:{message:"Invalid incoming message"},131:{message:"Constraints error"},132:{message:"Access denied"},133:{message:"Contract stopped"},134:{message:"Invalid argument"},135:{message:"Code of a contract was not found"},136:{message:"Invalid address"},137:{message:"Masterchain support is not enabled for this contract"}},Q=[{name:"StateInit",header:null,fields:[{name:"code",type:{kind:"simple",type:"cell",optional:!1}},{name:"data",type:{kind:"simple",type:"cell",optional:!1}}]},{name:"Context",header:null,fields:[{name:"bounced",type:{kind:"simple",type:"bool",optional:!1}},{name:"sender",type:{kind:"simple",type:"address",optional:!1}},{name:"value",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"raw",type:{kind:"simple",type:"slice",optional:!1}}]},{name:"SendParameters",header:null,fields:[{name:"bounce",type:{kind:"simple",type:"bool",optional:!1}},{name:"to",type:{kind:"simple",type:"address",optional:!1}},{name:"value",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"mode",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"body",type:{kind:"simple",type:"cell",optional:!0}},{name:"code",type:{kind:"simple",type:"cell",optional:!0}},{name:"data",type:{kind:"simple",type:"cell",optional:!0}}]},{name:"Deploy",header:2490013878,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}}]},{name:"DeployOk",header:2952335191,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}}]},{name:"FactoryDeploy",header:1829761339,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}},{name:"cashback",type:{kind:"simple",type:"address",optional:!1}}]}],k=[],E=[{receiver:"internal",message:{kind:"text",text:"identify"}},{receiver:"internal",message:{kind:"text",text:"deploy 2nd"}},{receiver:"internal",message:{kind:"typed",type:"Deploy"}}];class l{constructor(e,t){A(this,"address");A(this,"init");A(this,"abi",{types:[{name:"StateInit",header:null,fields:[]},{name:"Context",header:null,fields:[]},{name:"SendParameters",header:null,fields:[]},{name:"Deploy",header:2490013878,fields:[]},{name:"DeployOk",header:2952335191,fields:[]},{name:"FactoryDeploy",header:1829761339,fields:[]}],types:Q,getters:k,receivers:E,errors:H});this.address=e,this.init=t}static async init(e){return await p(e)}static async fromInit(e){const t=await p(e),a=o.contractAddress(0,t);return new l(a,t)}static fromAddress(e){return new l(e)}async send(e,t,a,n){let i=null;if(n==="identify"&&(i=o.beginCell().storeUint(0,32).storeStringTail(n).endCell()),n==="deploy 2nd"&&(i=o.beginCell().storeUint(0,32).storeStringTail(n).endCell()),n&&typeof n=="object"&&!(n instanceof o.Slice)&&n.$$type==="Deploy"&&(i=o.beginCell().store(D(n)).endCell()),i===null)throw new Error("Invalid message type");await e.internal(t,{...a,body:i})}}function z(s,e,t){let a;h(s,g,r=>t(3,a=r));let n,i,d;return C(g,a={markdown:b,tactCode:v,deploy:async()=>{n=await I.Blockchain.create();const r=await n.treasury("deployer");i=r.getSender(),d=n.openContract(await l.fromInit(1n));const c={[r.address.toString()]:"deployer",[d.address.toString()]:"Todo(1)",[(await l.fromInit(2n)).address.toString()]:"Todo(2)"};return[[d],c,[await d.send(r.getSender(),{value:o.toNano(1)},{$$type:"Deploy",queryId:0n})]]},messages:{'"identify" to 1':async()=>[await d.send(i,{value:o.toNano(1)},"identify")],'"identify" to 2':async()=>{const r=await l.fromInit(2n);return[await n.openContract(l.fromAddress(r.address)).send(i,{value:o.toNano(1)},"identify")]},'"deploy 2nd" to 1':async()=>[await d.send(i,{value:o.toNano(1)},"deploy next")]},getters:{},prev:y(import.meta.url).prev,next:y(import.meta.url).next},a),[]}class G extends u{constructor(e){super(),w(this,e,z,null,f,{})}}export{G as default};

var B=Object.defineProperty;var u=(s,e,t)=>e in s?B(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var A=(s,e,t)=>(u(s,typeof e!="symbol"?e+"":e,t),t);import{S as I,i as w,s as f,I as h,ac as Q}from"../chunks/index.9fe14626.js";import{d as a,g,s as m}from"../chunks/store.96cf5894.js";import{d as H}from"../chunks/index.7100d5a9.js";const k=`# Authenticating Children

If you look closely at the previous example you will notice that it is somewhat dangerous.

What happens if some user tries to send a \`HiFromChild\` message and impersonate a child? What happens if some user tries to send a \`HiFromParent\` message and impersonate the parent?

To add authentication that messages came from where we think they came from, we simply need to add \`require()\` in the beginning of every protected receiver and make sure that the sender is who we expect it is.

It is best practice to add this authentication to every message coming from a parent and every message coming from a child.

## Let's try to hack this contract

Try pressing the <span class="mdButton grape">Send HiFromChild{1}</span> button. This will send the parent an impersonated \`HiFromChild\` message, but from some user, not from a real child.

Since this code is now protected, it will notice that the sender is incorrect and reject the message with an access denied error.`,M=`import "@stdlib/deploy";

message HiFromParent {
    greeting: String;
}

message HiFromChild {
    fromSeqno: Int as uint64;
    greeting: String;
}

// we have multiple instances of the children
contract TodoChild {

    parent: Address; // we added this variable so a child always knows who the parent is
    seqno: Int as uint64;
 
    // when deploying an instance, we must specify its index (sequence number)
    init(parent: Address, seqno: Int) {
        self.parent = parent;
        self.seqno = seqno;
    }

    receive(msg: HiFromParent) {
        require(sender() == self.parent, "Access denied");
        // only the real parent can get here
        dump(self.seqno);
        dump("handling hi from parent");
        self.reply(HiFromChild{fromSeqno: self.seqno, greeting: "sup"}.toCell());
    }
}

// we have one instance of the parent
contract TodoParent with Deployable {
 
    init() {}

    receive("greet 3") {
        let i: Int = 0;
        repeat (3) {
            i = i + 1;
            let init: StateInit = initOf TodoChild(myAddress(), i);
            send(SendParameters{
                to: contractAddress(init),
                body: HiFromParent{greeting: "darling"}.toCell(),
                value: ton("0.1"),              // pay for message and potential deployment
                mode: SendIgnoreErrors,
                code: init.code,                // if child is not deployed, also deploy it
                data: init.data
            });
        }
    }

    receive(msg: HiFromChild) {
        let expectedAddress: Address = contractAddress(initOf TodoChild(myAddress(), msg.fromSeqno));
        require(sender() == expectedAddress, "Access denied");
        // only the real children can get here
        dump("handling hi from child");
        dump(msg.fromSeqno);
    }
}`;function L(s){return e=>{let t=e;t.storeUint(2490013878,32),t.storeUint(s.queryId,64)}}function b(s){return e=>{let t=e;t.storeUint(1237539370,32),t.storeUint(s.fromSeqno,64),t.storeStringRefTail(s.greeting)}}async function p(){const s=a.Cell.fromBase64("te6ccgECFAEABG0AART/APSkE/S88sgLAQIBYgIDApLQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4IIwyPhDAcx/AcoAye1UBAUCAVgQEQE07UTQ1AH4Y9IAMJFt4Pgo1wsKgwm68uCJ2zwGA+Ltou37AZIwf+BwIddJwh+VMCDXCx/eIIIQScNaKrqOljDTHwGCEEnDWiq68uCB0z/UAdASbBLgIIIQlGqYtrqOqDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gwACRMOMNcAcICQACbQLsMPhD+Cgi2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiIIAwT34QhLHBfL0jQWaGFuZGxpbmcgaGkgZnJvbSBjaGlsZIP4UMNs8/hQwfwwKATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPA0BWvkBgvBxkll/MNBNcADYLR2Lzj/mYSWpv8837qLxUky12JrJ2rqOhds8f9sx4AsA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AP2cHOPdqT4Q/goIts8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIi3ZGFybGluZ4yAGCENGoakpYyx/IWM8WyQHMyROCEAX14QBacgJ/BkVV2zzkDA0OAKIC0PQEMG0BgWhBAYAQ9A9vofLghwGBaEEiAoAQ9BfIAcj0AMkBzHABygBAA1kg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxaBAQHPAMkByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADwACMACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAC5u70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIAgFIEhMAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtVG9wUTNVSnVFRG80RTREb253WVg0cGpGWUhockw0MWc3RlZNNWdpWTU3TFKCA="),e=a.Cell.fromBase64("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");let t=a.beginCell();t.storeRef(e),t.storeUint(0,1);const o=t.endCell();return{code:s,data:o}}const D={2:{message:"Stack undeflow"},3:{message:"Stack overflow"},4:{message:"Integer overflow"},5:{message:"Integer out of expected range"},6:{message:"Invalid opcode"},7:{message:"Type check error"},8:{message:"Cell overflow"},9:{message:"Cell underflow"},10:{message:"Dictionary error"},13:{message:"Out of gas error"},32:{message:"Method ID not found"},34:{message:"Action is invalid or not supported"},37:{message:"Not enough TON"},38:{message:"Not enough extra-currencies"},128:{message:"Null reference exception"},129:{message:"Invalid serialization prefix"},130:{message:"Invalid incoming message"},131:{message:"Constraints error"},132:{message:"Access denied"},133:{message:"Contract stopped"},134:{message:"Invalid argument"},135:{message:"Code of a contract was not found"},136:{message:"Invalid address"},137:{message:"Masterchain support is not enabled for this contract"},49469:{message:"Access denied"}},v=[{name:"StateInit",header:null,fields:[{name:"code",type:{kind:"simple",type:"cell",optional:!1}},{name:"data",type:{kind:"simple",type:"cell",optional:!1}}]},{name:"Context",header:null,fields:[{name:"bounced",type:{kind:"simple",type:"bool",optional:!1}},{name:"sender",type:{kind:"simple",type:"address",optional:!1}},{name:"value",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"raw",type:{kind:"simple",type:"slice",optional:!1}}]},{name:"SendParameters",header:null,fields:[{name:"bounce",type:{kind:"simple",type:"bool",optional:!1}},{name:"to",type:{kind:"simple",type:"address",optional:!1}},{name:"value",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"mode",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"body",type:{kind:"simple",type:"cell",optional:!0}},{name:"code",type:{kind:"simple",type:"cell",optional:!0}},{name:"data",type:{kind:"simple",type:"cell",optional:!0}}]},{name:"Deploy",header:2490013878,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}}]},{name:"DeployOk",header:2952335191,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}}]},{name:"FactoryDeploy",header:1829761339,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}},{name:"cashback",type:{kind:"simple",type:"address",optional:!1}}]},{name:"HiFromParent",header:3517475402,fields:[{name:"greeting",type:{kind:"simple",type:"string",optional:!1}}]},{name:"HiFromChild",header:1237539370,fields:[{name:"fromSeqno",type:{kind:"simple",type:"uint",optional:!1,format:64}},{name:"greeting",type:{kind:"simple",type:"string",optional:!1}}]}],F=[],S=[{receiver:"internal",message:{kind:"text",text:"greet 3"}},{receiver:"internal",message:{kind:"typed",type:"HiFromChild"}},{receiver:"internal",message:{kind:"typed",type:"Deploy"}}];class c{constructor(e,t){A(this,"address");A(this,"init");A(this,"abi",{types:[{name:"StateInit",header:null,fields:[]},{name:"Context",header:null,fields:[]},{name:"SendParameters",header:null,fields:[]},{name:"Deploy",header:2490013878,fields:[]},{name:"DeployOk",header:2952335191,fields:[]},{name:"FactoryDeploy",header:1829761339,fields:[]},{name:"HiFromParent",header:3517475402,fields:[]},{name:"HiFromChild",header:1237539370,fields:[]}],types:v,getters:F,receivers:S,errors:D});this.address=e,this.init=t}static async init(){return await p()}static async fromInit(){const e=await p(),t=a.contractAddress(0,e);return new c(t,e)}static fromAddress(e){return new c(e)}async send(e,t,o,n){let i=null;if(n==="greet 3"&&(i=a.beginCell().storeUint(0,32).storeStringTail(n).endCell()),n&&typeof n=="object"&&!(n instanceof a.Slice)&&n.$$type==="HiFromChild"&&(i=a.beginCell().store(b(n)).endCell()),n&&typeof n=="object"&&!(n instanceof a.Slice)&&n.$$type==="Deploy"&&(i=a.beginCell().store(L(n)).endCell()),i===null)throw new Error("Invalid message type");await e.internal(t,{...o,body:i})}}function E(s){return e=>{let t=e;t.storeUint(3517475402,32),t.storeStringRefTail(s.greeting)}}function J(s){return e=>{let t=e;t.storeAddress(s.parent),t.storeInt(s.seqno,257)}}async function y(s,e){const t=a.Cell.fromBase64("te6ccgECDwEAA2oAART/APSkE/S88sgLAQIBYgIDAtTQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZWSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFss/ye1UBAUCAVgLDADM7UTQ1AH4Y9IAAY4l+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHTP1lsEuD4KNcLCoMJuvLgifpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZAtEBAToBkjB/4HAh10nCH5UwINcLH96CENGoakq64wIwcAYCzNMfAYIQ0ahqSrry4IHUAdAxMIIAwT34QlIwxwXy9CDbPP4UMI0F2hhbmRsaW5nIGhpIGZyb20gcGFyZW50g/hQwizc3VwhSEMhZghBJw1oqUAPLH8s/yFjPFskBzMn4QgF/bds8fwcIAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydABOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8CQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAKAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgCAUgNDgARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1hR05uUXN5UVNTRWNRSjZTUmNqVXhqbkZ2NHZQMjNCSlVtakt2OHdNcWY4NYIA=="),o=a.Cell.fromBase64("te6cckECEQEAA3QAAQHAAQEFoNCDAgEU/wD0pBP0vPLICwMCAWIJBAIBWAgFAgFIBwYAdbJu40NWlwZnM6Ly9RbWFHTm5Rc3lRU1NFY1FKNlNSY2pVeGpuRnY0dlAyM0JKVW1qS3Y4d01xZjg1ggABGwr7tRNDSAAGAAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSALU0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wts88uCCyPhDAcx/AcoAWVkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLP8ntVBAKAToBkjB/4HAh10nCH5UwINcLH96CENGoakq64wIwcAsCzNMfAYIQ0ahqSrry4IHUAdAxMIIAwT34QlIwxwXy9CDbPP4UMI0F2hhbmRsaW5nIGhpIGZyb20gcGFyZW50g/hQwizc3VwhSEMhZghBJw1oqUAPLH8s/yFjPFskBzMn4QgF/bds8fw8MATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPA0ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADgCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzADeyCHBAJiALQHLBwGjAd4hgjgyfLJzQRnTt6mqHbmOIHAgcY4UBHqpDKYwJagSoASqBwKkIcAARTDmMDOqAs8BjitvAHCOESN6qQgSb4wBpAN6qQQgwAAU5jMipQOcUwJvgaYwWMsHAqVZ5DAx4snQAMztRNDUAfhj0gABjiX6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdM/WWwS4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFkC0QFovffD");let n=a.beginCell();n.storeRef(o),n.storeUint(0,1),J({$$type:"TodoChild_init_args",parent:s,seqno:e})(n);const i=n.endCell();return{code:t,data:i}}const N={2:{message:"Stack undeflow"},3:{message:"Stack overflow"},4:{message:"Integer overflow"},5:{message:"Integer out of expected range"},6:{message:"Invalid opcode"},7:{message:"Type check error"},8:{message:"Cell overflow"},9:{message:"Cell underflow"},10:{message:"Dictionary error"},13:{message:"Out of gas error"},32:{message:"Method ID not found"},34:{message:"Action is invalid or not supported"},37:{message:"Not enough TON"},38:{message:"Not enough extra-currencies"},128:{message:"Null reference exception"},129:{message:"Invalid serialization prefix"},130:{message:"Invalid incoming message"},131:{message:"Constraints error"},132:{message:"Access denied"},133:{message:"Contract stopped"},134:{message:"Invalid argument"},135:{message:"Code of a contract was not found"},136:{message:"Invalid address"},137:{message:"Masterchain support is not enabled for this contract"},49469:{message:"Access denied"}},T=[{name:"StateInit",header:null,fields:[{name:"code",type:{kind:"simple",type:"cell",optional:!1}},{name:"data",type:{kind:"simple",type:"cell",optional:!1}}]},{name:"Context",header:null,fields:[{name:"bounced",type:{kind:"simple",type:"bool",optional:!1}},{name:"sender",type:{kind:"simple",type:"address",optional:!1}},{name:"value",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"raw",type:{kind:"simple",type:"slice",optional:!1}}]},{name:"SendParameters",header:null,fields:[{name:"bounce",type:{kind:"simple",type:"bool",optional:!1}},{name:"to",type:{kind:"simple",type:"address",optional:!1}},{name:"value",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"mode",type:{kind:"simple",type:"int",optional:!1,format:257}},{name:"body",type:{kind:"simple",type:"cell",optional:!0}},{name:"code",type:{kind:"simple",type:"cell",optional:!0}},{name:"data",type:{kind:"simple",type:"cell",optional:!0}}]},{name:"Deploy",header:2490013878,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}}]},{name:"DeployOk",header:2952335191,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}}]},{name:"FactoryDeploy",header:1829761339,fields:[{name:"queryId",type:{kind:"simple",type:"uint",optional:!1,format:64}},{name:"cashback",type:{kind:"simple",type:"address",optional:!1}}]},{name:"HiFromParent",header:3517475402,fields:[{name:"greeting",type:{kind:"simple",type:"string",optional:!1}}]},{name:"HiFromChild",header:1237539370,fields:[{name:"fromSeqno",type:{kind:"simple",type:"uint",optional:!1,format:64}},{name:"greeting",type:{kind:"simple",type:"string",optional:!1}}]}],P=[],U=[{receiver:"internal",message:{kind:"typed",type:"HiFromParent"}}];class l{constructor(e,t){A(this,"address");A(this,"init");A(this,"abi",{types:[{name:"StateInit",header:null,fields:[]},{name:"Context",header:null,fields:[]},{name:"SendParameters",header:null,fields:[]},{name:"Deploy",header:2490013878,fields:[]},{name:"DeployOk",header:2952335191,fields:[]},{name:"FactoryDeploy",header:1829761339,fields:[]},{name:"HiFromParent",header:3517475402,fields:[]},{name:"HiFromChild",header:1237539370,fields:[]}],types:T,getters:P,receivers:U,errors:N});this.address=e,this.init=t}static async init(e,t){return await y(e,t)}static async fromInit(e,t){const o=await y(e,t),n=a.contractAddress(0,o);return new l(n,o)}static fromAddress(e){return new l(e)}async send(e,t,o,n){let i=null;if(n&&typeof n=="object"&&!(n instanceof a.Slice)&&n.$$type==="HiFromParent"&&(i=a.beginCell().store(E(n)).endCell()),i===null)throw new Error("Invalid message type");await e.internal(t,{...o,body:i})}}function q(s,e,t){let o;h(s,m,d=>t(3,o=d));let n,i,r;return Q(m,o={markdown:k,tactCode:M,deploy:async()=>{n=await H.Blockchain.create();const d=await n.treasury("deployer");i=d.getSender(),r=n.openContract(await c.fromInit());const C={[d.address.toString()]:"deployer",[r.address.toString()]:"TodoParent",[(await l.fromInit(r.address,1n)).address.toString()]:"TodoChild(1)",[(await l.fromInit(r.address,2n)).address.toString()]:"TodoChild(2)",[(await l.fromInit(r.address,3n)).address.toString()]:"TodoChild(3)"};return[[r],C,[await r.send(d.getSender(),{value:a.toNano(1)},{$$type:"Deploy",queryId:0n})]]},messages:{"greet 3":async()=>[await r.send(i,{value:a.toNano(1)},"greet 3")],"HiFromChild{1}":async()=>[await r.send(i,{value:a.toNano(1)},{$$type:"HiFromChild",fromSeqno:1n,greeting:"hack"})]},getters:{},prev:g(import.meta.url).prev,next:g(import.meta.url).next},o),[]}class W extends I{constructor(e){super(),w(this,e,q,null,f,{})}}export{W as default};

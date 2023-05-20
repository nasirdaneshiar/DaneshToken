import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {

    let owner : Principal = Principal.fromText("uw7fd-mwthp-tfkvt-u6cbb-mpvss-2r5fe-w26rj-ttlkj-dwu2e-7sulo-nae");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "Danesh" ;

    private stable var balanceEntries: [(Principal, Nat)]= [];
    private var balances = HashMap.HashMap<Principal,Nat>(1,Principal.equal, Principal.hash);

    if (balances.size() < 1){
            balances.put(owner, totalSupply);
    };

    public query func balanceOf(who: Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null){
            let amount = 10000;
            let result = await transfer(msg.caller,amount);
            return result;
        }else{
            return "Aready claimed!";
        } ;
        /* return "sucess"; */
            
    };

    public shared(msg) func transfer(to: Principal,amount : Nat): async Text{
        let fromBalance : Nat= await balanceOf(msg.caller);
        if (fromBalance > amount){
            let newfromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller,newfromBalance); 
            let toBalance = await balanceOf(to);
            let newtoBalance = toBalance + amount;
            balances.put(to, newtoBalance);
            return "Success,Houra😉";
        } else {
            return "amount exceeds from balance!";
        };
        
    };

    system func preupgrade(){
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade(){
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(),1,Principal.equal, Principal.hash);
        if (balances.size() < 1){
            balances.put(owner, totalSupply);
        };
    };
};
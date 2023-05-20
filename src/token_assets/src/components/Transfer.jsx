import React,{ useState } from "react";
import {Principal} from "@dfinity/principal";
import {token , canisterId , createActor} from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client"; 

function Transfer() {
  const [transferID,setID] = useState("");
  const [Amount,setAmount] = useState("");
  const [disabled,setdisable]=useState(false);
  const [result,setresult] = useState("");
  async function handleClick() {
    setdisable(true);

    const authClient =  await AuthClient.create();
    const identity = await authClient.getIdentity(); 
    const authenticatedCanister = createActor(canisterId, {
      agentOptions : {
        identity,
      },
    });

    const amountTransfer = Number(Amount);
    const recepId = Principal.fromText(transferID);
    const resultxt = await authenticatedCanister.transfer(recepId,amountTransfer);
    setresult(resultxt);
    setdisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={transferID}
                onChange={(e)=>setID(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value = {Amount}
                onChange = {(e)=>setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button 
          id="btn-transfer" 
          onClick={handleClick} 
          disabled={disabled}>
            Transfer
          </button>
        </p>
        <p>{result}</p>
      </div>
    </div>
  );
}

export default Transfer;

import React,{ useState } from "react";
import { token , canisterId , createActor } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client"; 

function Faucet(props) {
  const [disabled,setdisable] = useState(false);
  const [buttontxt, settext] = useState("Gimme gimme");
  
  async function handleClick(event) {
    setdisable(true);

    const authClient =  await AuthClient.create();
    const identity = await authClient.getIdentity(); 

    const authenticatedCanister = createActor(canisterId, {
      agentOptions : {
        identity,
      },
    });

    const textbtn = await authenticatedCanister.payOut();
    settext(textbtn);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free DANESH tokens here! Claim 10,000 DANESH tokens to {props.userPrincipal}</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={disabled}>
          {buttontxt}
        </button>
      </p>
    </div>
  );
}

export default Faucet;

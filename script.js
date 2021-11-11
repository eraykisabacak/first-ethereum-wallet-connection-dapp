let accounts;

window.onload = function () {
    if(window.ethereum){
        this.ethereum.on("accountsChanged",handleAccountsChanged);

        window.ethereum.request({method:'eth_accounts'})
            .then(handleAccountsChanged)
            .catch((error) => {
                console.log(error);
            })
    }
}

const walletDisconnect = () => {
    accounts = null;
    document.getElementById("address").innerHTML = ""
    document.getElementById("address").style = "margin-bottom: 25px;"
    document.getElementById("error").innerHTML = ""
    document.getElementById("error").style = "margin-bottom: 25px;"
    document.getElementById("balance").innerHTML = ""
    document.getElementById("balance").style = "margin-bottom: 25px;"
    document.getElementById("connectBtn").style = "display:block;background-color: #f6851b;color:white;border-radius: 5px;padding: 10px;margin-bottom: 25px;"
    document.getElementById("disconnectBtn").style = "display:none;"
}

const handleAccountsChanged =(a)=>{
    accounts = a;
}

const connectEth = async () => {
    accounts = await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .catch((err) => {
        console.log(err.code);
        document.getElementById("error").innerHTML = err
      });
  
    document.getElementById("address").innerHTML = " Bağlantı kurulan hesap : " + accounts[0];
    document.getElementById("address").style = "display:block;margin-bottom: 25px;"
    checkEthBalance()
    document.getElementById("connectBtn").style = "display:none;"
    document.getElementById("disconnectBtn").style = "display:block;padding:10px;border-radius:5px;color:white;background-color:red;margin-bottom: 25px;"
};

const checkEthBalance = async () => {
    let balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [accounts[0]]
    }).catch((err) => {
      console.log(err);
    });
    try{
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
        const ethPrice = await res.json()
        document.getElementById("balance").innerHTML = " Balance : " + (balance/Math.pow(10,18)).toFixed(4) + " ETH ~ " + (balance/Math.pow(10,18) * ethPrice.ethereum.usd).toFixed(2) + " $";
        document.getElementById("balance").style = "display:block;margin-bottom: 25px;"

    }catch(e){
        console.log(e)
        document.getElementById("balance").innerHTML = " Balance : " + (balance/Math.pow(10,18)).toFixed(4) + " ETH "
    }
    
};
  
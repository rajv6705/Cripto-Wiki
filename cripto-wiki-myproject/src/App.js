import React, { Component } from 'react';
import './App.css';

let xhr = new XMLHttpRequest();

class App extends Component {
  constructor(){
    super();
    this.state = {
        students:[]
    };
    this.students2 = [];
}

  criptoCoinSearch() {
    var self = this ;
    var code = document.getElementById('inpt').value;
    let xhr1 = new XMLHttpRequest();
    xhr.open('GET','https://api.coingecko.com/api/v3/coins/list');
    xhr.onload = function(){
     var data = JSON.parse(xhr.responseText);
    for(var i=0;i<data.length;i++){
      if(data[i]["name"] === code){
        var url = "https://api.coingecko.com/api/v3/coins/"+data[i]["id"];
         xhr1.open('GET',url);
         xhr1.onload = function() {
           var data1 = JSON.parse(xhr1.responseText);
           //self.setState({students.push(data1)});
           self.students2.push(data1);
           self.forceUpdate();
        };
         xhr1.send();
      }
    }

  };
  xhr.send();
  
}
  // findResult() {
  // var box = document.getElementById('main-container');
  // box.style.display = 'block';
  // }
  
  componentDidMount() {
    this.criptoCoinSearch();
    // this.findResult();
  }
  render() {
    return (
      <div className="App">
      <h1>Cripto Wiki</h1>
      <div className="container">
      <input type="text" id="inpt" placeholder="Enter the Crypto Currency Name" />
      <button id="btn" className="btn btn-outline-secondary" onClick= {this.criptoCoinSearch.bind(this)} >Get info About Coin</button>
      </div>
      {/* <div>
       
      </div> */}
      <div id="main-container">
        <div id="frame"> 
        {this.students2.map( (item) => {
        return <p>{item.name}-{item.symbol} </p>
        })}
        </div>
        <div id="frame1"> 
        {this.students2.map( (item) => {
        return <img src ={item.image.large} />
        })} 
         </div>
        <div id="frame2"> 
        {this.students2.map( (item) => {
        return <p>{item.description.de}</p>
        })}
      </div>
        <div id="frame3"> 
        {this.students2.map( (item) => {
        return <p>Country of Origin -{item.country_origin}<br/>
        Date of Appearance-{item.genesis_date}<br/>
        Market Cap Rank-{item.market_cap_rank}<br/>
        Coin Gecko-Rank-{item.coingecko_rank}<br/>
        Score-{item.coingecko_score}<br/>
        Developer Score-{item.developer_score}<br/>
        Community Score-{item.community_score}<br/>
        Liquidity Score-{item.liquidity_score}<br/>
        Public Interest Score-{item.public_interest_score} </p>
        })}
         </div>
      </div>
      </div>
    );
  }
}

export default App;

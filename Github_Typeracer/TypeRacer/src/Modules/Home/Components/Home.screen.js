import React, { Component }     from 'react';
import  '../../../Resources/css/Chatbot.css';

class Home extends Component {
  constructor(){
    super();
        this.state = {
            typewriter: '',
            message:    '',
            disabled:   true,
            timerflag:  true,
            CPU:         0,
            user:        0,
            incrementer: 0,
        }
    }

    componentDidMount(){
      let x = Math.ceil(100/this.state.message.length);
        this.setState({
            incrementer: x
        })

        fetch('http://www.randomtext.me/api/',{
            method:'GET'
        }).then(response=>{
            return response.json().then(
                data=>{
                  let formatter      = data.text_out;
                  let firstCheck     = formatter.replace('<p>','') || formatter.replace('.<p>','');
                  let SecondCheck    = firstCheck.replace('<p></p>','') || firstCheck.replace('.<p></p>','');
                  let thirdCheck     = SecondCheck.replace('</p>','') || SecondCheck.replace('.</p>','');
                  let final          = thirdCheck.replace('</p><p>','')|| thirdCheck.replace('.</p><p>','');
                  
                  this.setState({
                      message: final
                  },()=>{
                      console.log(this.state.message)
                  })
                }
            )
        })
       
           
    }

    checkValidity=(event)=>{
        console.log(event.keyCode);
        if(event.keyCode === 86){
            this.setState({
                typewriter: 'Copy & paste not allowed',
                disabled:    true
            })
        }
    }

    handlechangeinput=(e)=>{
        this.setState({
            typewriter: e.target.value,
            
        },()=>{  
            this.setState({
                disabled: this.state.message.includes(this.state.typewriter),
            },()=>{
                if(this.state.typewriter === `${this.state.message}`){
                    window.alert('User wins')
                }
                if(this.state.disabled === true && this.state.user !== 100){
                    this.setState({
                        user: this.state.user+this.state.incrementer,
                    })
                }
            })
        })
    }

    wow=()=>{
        this.setState({
            CPU: this.state.CPU+2,
            timerflag: false
        },()=>{
            if(this.state.CPU === 100){
                clearInterval(this.nato);
            }
            if(this.state.CPU === 100  && (this.state.typewriter !== `${this.state.message}`) ){
                window.alert('CPU wins')
            }
           
        })
    }

    start=()=>{
        if(this.state.CPU !== 100 && this.state.timerflag === true ){
            this.nato = setInterval(this.wow.bind(this),1000);
        } 
    }
  
  render() {
    return (
        <div className='App'>
            <div className='row-heading'>
                <div className='inner-heading'>
                   <div className='sticky'>
                      <p className='glow'>TypeRacer</p>
                    </div> 
                </div> 
            </div>
           <div className='Rectangle-14'>
                <p className='text-show' onFocus={e=> this.checkValidity(e)}>{this.state.message}</p>
            </div>
            <div className='InterviewAssignment'>
                <div className='conversation-box'>
                        <span className='heading-font'>
                            {/* <img src={require('../../../Resources/Images/Bot.jpeg')} alt='CPU' />
                             <br />
                             <img src={require('../../../Resources/Images/user.png')} alt='user' /> */}
                            <p className='heading-font blue' style={{color:'blue'}} >CPU</p>
                            <p className='heading-font green' style={{color:'green'}}>Player</p>
                        </span>
                        <div class="w3-light-grey pos-top">
                            <div class="w3-container w3-blue" style={{height:'24px',width:`${this.state.CPU}%`}}></div>
                        </div>
                    <br />
                        
                        <div class="w3-light-grey pos-top">
                            <div class="w3-container w3-green" style={{height:'24px',width:`${this.state.user}%`}}></div>
                        </div>
                       
                </div>
                <button className='btn-primary custom-handle ' onClick={this.start.bind(this)}> START</button>
                <div className='Rectangle-3'>
                    <input type='text' name='typewriter' onKeyDown={e=> this.checkValidity(e)} disabled={this.state.timerflag}  onChange={e=> this.handlechangeinput(e)} value={this.state.typewriter} placeholder='Type Message Here to check your typing speed...' className='main-input' />
                    {this.state.disabled? '': <p className='error-display'>Incorrect word</p>}
                </div>        
            </div>     
        </div>
        )
  }}
    
    
  


export default Home;

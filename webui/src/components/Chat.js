import React, {Component} from 'react';

export class Chat extends Component {
    constructor(props){
        super(props);
        this.state = {context: {}, messages: []};
        this.setMessage = this.setMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.sendInput = this.sendInput.bind(this);
        this.scrollResponse = this.scrollResponse.bind(this);
    }

    setMessage(text, who='person', attr={}){
        let response = {text: text, who: who, attr: attr};
        this.setState({messages:[...this.state.messages, response]});
    }

    scrollResponse(){
        let responses = document.getElementById('responses');
        responses.scrollTop = responses.scrollHeight;
    }

    sendMessage(text, context){
        let parameters = {};
        if(text){
            parameters.input = {text:text};
        }
        if(context){
            parameters.context = context;
        }

        /*
         * mock - need api here!
         */
        let response = 'test response';
        this.setMessage(response, 'bot', {});
        this.scrollResponse();
    }

    sendInput(e){
        let text = e.target.value;
        if(e.key === 'Enter' && text){
            this.setMessage(text);
            this.scrollResponse();
            this.sendMessage(text, this.state.context);
            e.target.value = '';
        }
    }

    componentWillMount(){
        this.sendMessage(null, null);
    }

    render(){
        return(
            <div>
                <div className='responses' id='responses'>
                    {this.state.messages && this.state.messages.length ? this.state.messages.map((msg, i)=>
                        <Answer key={i} text={msg.text} who={msg.who} attr={msg.attr} context={this.state.context} setMessage={this.setMessage}/>)
                        :null}
                    }
                </div>
                <div>
                    <input typ='text' className='input-question' placeholder='write here...' onKeyPress={this.sendInput}/>
                </div>
            </div>
        );
    }
}

export class Answer extends Component {
    constructor(props){
        super(props);
        this.state = {translate: ''};
        this.setTranslate = this.setTranslate.bind(this);
    }

    setTranslate(result){
        this.setState({translate: result});
    }

    render(){
        const {text, who, context, attr, setMessage} = this.props;
        return(
            <div className={'response response-' + who}>
                <img src='/images/avatar.png' className='avatar'/>
                <div className='response-content'>
                    <div>
                        <span dangerouslySetInnerHTML={{__html: text}}></span>
                    </div>
                </div>
                {attr.general ?
                    <Suggest attr={attr} setMessage={setMessage}/>
                : null}
            </div>
        );
    }
}

/*
 * does nothing right now
 */
export class Translate extends Component {
    constructor(props){
        super(props);
        this.submitTranslate = this.submitTranslate.bind(this);
    }

    submitTranslate(){

    }

    render(){
        return(
            <div></div>
        );
    }
}

export class Suggest extends Component {
    constructor(props){
        super(props);
        this.state = {result: []};
        this.loadSuggestion = this.loadSuggestion.bind(this);
    }

    loadSuggestion(){
        var attrs = this.props.attrs;
        /*
         * mock up right now
         */
        this.setState({result: 'suggestion'});
    }

    componentWillMount(){
        this.loadSuggestion();
    }

    render(){
        const {setMessage} = this.props;
        return(
            <div className='results'>
                <div className='footerresult'>
                    <b>this.state.result</b>
                </div>
            </div>
        );
    }
}
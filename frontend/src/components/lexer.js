import Parser from './parser'

class Lexer{
    
    constructor(){
        this.parse = new Parser()   
    }

    numberic(c){
        switch(c){
            case '0':
                return 0;

            case '1':
                return 1;
                
            case '2':
                return 2;

            case '3':
                return 3;

            case '4':
                return 4;

            case '5':
                return 5;

            case '6':
                return 6;

            case '7':
                return 7;

            case '8':
                return 8;

            case '9':
                return 9;
            default:
                return false;
        }
    }

    decode(cmd){

        var cmds = cmd.split(" ")
        var prepro = []
        var pf = true;

        for(var i = 0; i < cmds.length;i++){
            if(cmds[i].charAt(0) === ""){
            }else{
                prepro.push(cmds[i])
            }
        }

        for(var i = 0; i < prepro.length;i++){
            if(this.numberic(prepro[i].charAt(0))){
                var flag = true
                for(var j = 0; j < prepro[i].length;j++){
                    if(this.numberic(prepro[i].charAt(j))){
                    }else{
                        flag = false
                    }
                }
                if(flag){
                }
                else{
                    pf = false;
                }            
            }
        }        
        if(pf){
            console.log(prepro)
            return prepro
        }
    }
}

export default Lexer
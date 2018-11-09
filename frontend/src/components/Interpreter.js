import Lexer from './lexer'
import Parser from './parser'

class Interpreter{

    stack = []
    heap = []

    constructor(){
        this.lexer = new Lexer()
        this.parser = new Parser();
    }

    run(cmd){
        var pre = this.lexer.decode(cmd)
        if(pre)
            this.parser.parsing(pre)
    }

}

export default Interpreter
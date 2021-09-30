module.exports = class ArchivoFS { 
    constructor (archivo) {
        this.archivo=archivo;
    }
    getAll(){
        const fs = require('fs');
        const data = fs.readFileSync(this.archivo);
        const objeto = JSON.parse(data);
        return objeto
    }
    save(titulo,precio,url){
        const fs = require('fs');
        const data = fs.readFileSync(this.archivo);
        const objeto = JSON.parse(data);
        let nextID = 1
        let agregarData;
        if(objeto.length===0){
            agregarData = {
                "id": nextID,
                "title": titulo,
                "price": precio,
                "thumbnail":url
            }
        }else{
            for (let i=0;i<objeto.length ;i++) {
                while( objeto[i].id >= nextID ){
                    nextID++;
                }
                agregarData = {
                    "id": nextID,
                    "title": titulo,
                    "price": precio,
                    "thumbnail":url
                }
            }
        }
        // console.log('agregarData',agregarData)
        objeto.push(agregarData);
        const dataToJSON = JSON.stringify(objeto,null,2);
        fs.writeFileSync(this.archivo, dataToJSON);
        // console.log('data:',objeto);
        }
    deleteById (idNum) {
        const fs = require('fs');
        const data = fs.readFileSync(this.archivo);
        const objeto = JSON.parse(data);
        const objetoFiltrado = objeto.filter(obj => obj.id !== idNum);
        // console.log('objeto filtrado:',objetoFiltrado);
        const dataToJSON = JSON.stringify(objetoFiltrado,null,2);
        fs.writeFileSync(this.archivo, dataToJSON);
    }
    getById (idNum) {
        const fs = require('fs');
        const data = fs.readFileSync(this.archivo);
        const objeto = JSON.parse(data);
        const objetoFiltrado = objeto.filter(obj => obj.id === idNum);
        if (objetoFiltrado[0]===undefined) {
        //  console.log('objeto filtrado:',null);
         return null
        }else{
            // console.log('objeto filtrado:',objetoFiltrado[0]);
            return objetoFiltrado[0]       
        } 
    }
    
    deleteAll () {
        const fs = require('fs');
        const data = fs.readFileSync(this.archivo);
        // const objeto = JSON.parse(data);
        const obejtoVacio = [];
        const dataToJSON = JSON.stringify(obejtoVacio,null,2);
        fs.writeFileSync(this.archivo, dataToJSON);
    }
}

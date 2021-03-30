export default  {
    carregarCanvas(canvas){
        var canvas = document.querySelector(canvas);

        if(canvas && canvas.getContext){
           var contexto = canvas.getContext('2d');
           if(contexto) return contexto;
        }
        return false;
    },

    init() {
        //pega o contexto
        var contexto = this.carregarCanvas("#canvas")
        var result = document.querySelector('#result');
        
        if(contexto){
            //cria a imagem
            var image = new Image();
            image.onload = async () => {
                //Desenha a imagem
                contexto.drawImage(image, 0, 0);
                //Pega os todos os pixels da imagem pra um array
                const imageData = await contexto.getImageData(0, 0, image.width, image.height);
                //Troca as cores e conta quanto pixels verdes existem
                result.innerText = this.changeColors(imageData.data);   
                //Altera a cor das posicoes alterados          
                await contexto.putImageData(imageData, 0, 0);
            }
            //caminho da imagem
            image.src = 'img/Syngenta.bmp';
        }
    },
    
    changeColors(data) {
        //inicializa o contador
        var cont = 0

        //percorre o array
        for (var i = 0; i <= data.length; i+=4) {
            if(data[i] == 96 && data[i+1] == 192 && data[i+2] == 0){
                cont++;
            }
        }
        //retorna a quantidade de pixels verdes
        return `A quantidade total de pixels verdes é -> ${cont}`;
    }
}
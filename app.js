function getRandomValue(min,max){
    return Math.floor (Math.random()*(max-min))+min;//f-cja do której odwołujemy się 

}




const app = Vue.createApp({
    data(){
        return{     //w danych zawsze musi zwrócic obiekt, który przechowuje nasze 
        playerHealth:100,           //rzeczywiste dane
        monsterHealth:100,
        licznikRund:0

        };
  
    },
    computed:{
        monsterBarStyles(){
            return{
                width:this.monsterHealth +'%'}  
        },
        playerBarStyles(){
            return{
                width:this.playerHealth +'%'}
            },
            specjalnyAtak(){
                return this.licznikRund % 3 !==0;
                
            }
    },
    methods:{   //akcje działania przycisków
        attackMonster (){
            this.licznikRund++;
        const attactValue = getRandomValue(12,5)
              this.monsterHealth = this.monsterHealth-attactValue;
              this.attackPlayer();
              

    },
    attackPlayer(){
        const attactValue = getRandomValue(10,2)
        this.playerHealth -= attactValue
    },
    specialAttack(){
        this.licznikRund++;
        const attactValue = getRandomValue(10,25) //chcę ustawić żeby special działał co 3 rundy
        this.monsterHealth -= attactValue;
        this.attackPlayer()
    }
    },
    
});

app.mount('#game');
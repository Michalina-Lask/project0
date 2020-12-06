function getRandomValue(min,max){
    return Math.floor (Math.random()*(max-min))+min;//f-cja do której odwołujemy się 

}

const app = Vue.createApp({
    data(){
        return{     //w danych zawsze musi zwrócic obiekt, który przechowuje nasze 
        playerHealth:100,           //rzeczywiste dane
        monsterHealth:100,
        licznikRund:0,
        winner:null,
        logMessages:[]

        };
  
    },
    computed:{
        monsterBarStyles(){
            if(this.monsterHealth<0){
            return { width:'0%'}
            }  
            return{width:this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if (this.playerHealth < 0){
                return {width:'0%'}
            }
            return{
                width:this.playerHealth +'%'}
            },
            specjalnyAtak(){
                return this.licznikRund % 3 !==0;
                
            }
    },
    watch:{
        playerHealth(value){
if(value<=0 && this.monsterHealth <=0){
    this.winner='draw'}
//draw 

else if (value <=0)//przebrana gracza
{this.winner='monster'}
        },
        monsterHealth(value){
if(value <=0 && this.playerHealth<=0){
    this.winner='draw'
}
else if (value<=0){
    this.winner='player'
}
        }
    },
    methods:{   //akcje działania przycisków

        addLogMessages(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            })

        },
        surrender(){
            this.winner = 'monster'
        },
        nowaGra(){//aby zacząć nową grę restartuję liczniki
            this.playerHealth = 100
            this.monsterHealth = 100
            this.licznikRund = 0
            this.winner = null
            this.logMessage = []
        },
        attackMonster (){
            this.licznikRund++;
        const attactValue = getRandomValue(12,5)
              this.monsterHealth = this.monsterHealth-attactValue;
              this.attackPlayer();
              this.logMessages('player','attact', attactValue)
              

    },
    attackPlayer(){
        const attactValue = getRandomValue(10,2)
        this.playerHealth -= attactValue
        this.logMessages('monster','attact', attactValue)
    },
    specialAttack(){
        this.licznikRund++;
        const attactValue = getRandomValue(10,25) //chcę ustawić żeby special działał co 3 rundy
        this.monsterHealth -= attactValue;
        this.attackPlayer()
        this.logMessages('player','attact', attactValue)
    },
    
    healPlayer(){
        this.licznikRund++;     
const healValue = getRandomValue(8,20)
if(this.playerHealth + healValue >100){//100 to jest max więc nie możemy wyleczyć się na więcej
this.playerHealth = 100
}else{
this.playerHealth += healValue
    }
    this.logMessages('player','heal', healValue)
    this.attackPlayer();
},
},
});

app.mount('#game');
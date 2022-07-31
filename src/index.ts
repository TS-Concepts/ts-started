// string, boolean, number
let x: number = 10;

x = 210;

console.log(x);


/* Inferencia x Annotation
   
   As duas formas estão tipados, a diferença é que alguns preferem
   deixar o código mais explicito sem utilizar o recurso da linguagem 
   chamado annotation. 
*/

let y = 12;           // definindo uma variavel como inferencia

let z: number = 12;   // definindo uma variavel como annotation ou tipagem explicita

// tipagem explícita - quando definimos o tipo após a variavel
function showName(user: string, ticket: number) {
    console.log(`Olá ${user} seu ticket é ${ticket}`)
}

showName('Bruno', 123);

// Tipos básicos todos são definidos em caixa baixa.
let firstName: string  = "Matheus"
let age:       number  = 30
const isAdmin: boolean = true;


console.log(typeof firstName);

firstName = "João";

console.log(firstName);

// object - os arrays
const myNumbers: number[] = [1,2,3]


let numbers: number[];

numbers = [1,2,3,4,5]

let users: Array<string>;
users = ['Bruno', 'Jose'];


// tipo de dado - tuplas 
let myTuple: [number, string, string[]]

myTuple = [5, "bruno", ["a", "b"]]

console.log(myTuple);

// tipando um objeto user | object literals -> {prop: value}
const user: {name: string, age: number} = {
   name: "Bruno",
   age: 18,
}


console.log(user.name);

// tipo any - valor que aceita qualquer tipo de dado
let a:any = 0

a = "teste"
a = true
a = [];

console.log(a);



// union type - definindo mais de um tipo de dado
let id: string | number = "10"

// type alias - muito utilizado com banco de dados
type myIdType = number | string

const userId: myIdType = 10
const productId: myIdType = "0001";

console.log(typeof(productId));


// Type - reaproveita a tipagem em lugares diferentes
type IdType = string | number | undefined;

let userID: IdType;
let adminId: IdType;

userID = 'false';
adminId = 10;



// enum - enumera uma coleção 
// exemplo de utilização - tamanho de roupas (size: Médio, size: Pequeno ...)
enum Size {
    P = "Pequeno",
    M = "Médio",
    G = "Grande"
}

const camisa = {
    name: "Camisa gola V",
    size: Size.G,
}

console.log(camisa);

// literal types - determina um valor como um tipo
let teste: "autenticado";

//teste = "novo valor"; // caso o valor mude, não é possivel alterar. pois a string ja foi atribuida como um valor de tipagem


// funcoes
// tipando os argumentos definidos na função
function sum(a:number, b:number) {
    return a + b
}

console.log(sum(12,12));
//console.log(sum('12',true));

// tipando o retorno da função - basta colocar o tipo antes das {}
function sayHelloTo(name: string): string {
    return `Hello ${name}`
}

console.log(sayHelloTo('bruno'))

// tipando uma funçao que não retorna nada - basta colocar void antes das {}
// em eventos de DOM, as funções não retornam nada, então é interessante tipa-las
function logger(msg: string): void {
    console.log(msg);
}

logger("teste!");


// argumento opcional - basta utilizar o ?
function greeting(name: string, greet?: string): void {
    if(greet) {
        console.log(`Ola ${greet} ${name}`)
        return;
    }
    console.log(`Ola ${name}`)
}

greeting("José");
greeting("Bruno", "Sr.");

// interfaces - tipar um objeto
interface MathFunctionParams {
    n1: number,
    n2: number
}

function sumNumbers(nums: MathFunctionParams) {
    return nums.n1 + nums.n2

}

console.log(sumNumbers({ n1: 1, n2: 2}))


// A interface MathFunctionParams está tipando o argumento da função abaixo. 
function multiplayNumbers(nums: MathFunctionParams) {
    return nums.n1 * nums.n2
}

// tipando a constante someNumbers com a interface MathFunctionParams
const someNumbers:MathFunctionParams = {
    n1: 5,
    n2: 10
}

console.log(multiplayNumbers(someNumbers))



// narrowing - checagem de tipos
function doSomething(info: number | boolean) {
    if(typeof info === "number") {
        console.log(`O número é ${info}`);
        return;
    }
    console.log("Não foi passado um número");
}


doSomething(5);
doSomething(true);


// generics <> a letra T ou U são as mais utilizadas
// no exemplo abaixo, a função está recebendo um array generico/qualquer tipo de array
// é mais especifico do que o uso do Any
// quando usamos generics em uma função, ela aceita qualquer coisa.
function showArraysItems<T>(arr: T[]) {
    arr.forEach((item) => {
        console.log(`ITEM: ${item}`)
    })
}

const a1 = [1,2,3]
const a2 = ["a", "b", "c"]

showArraysItems(a1);
showArraysItems(a2);


// classes
class User {
    name
    role
    isApproved

    constructor(name: string, role: string, isApproved: boolean) {
        this.name = name
        this.role = role
        this.isApproved = isApproved
    }

    showUserName() {
        console.log(`O nome do usuário é ${this.name}`)
    }

    showUserAge(canShow: boolean): void {
        if(canShow) {
            console.log(`bem vindo: ${this.role}`)
            return
        }
        console.log("informação restrita!")
    }
}

const zeca = new User("Zeca", "Admin", true)

console.log(zeca);

zeca.showUserName()
zeca.showUserAge(false)


// interfaces em classes - A interface dita como a classe vai se comporta
// utilizado quando o projeto tem classes parecidas
// OBS: A Interface é apenas aplicada a class pai, caso esteja trabalhando com herança de classes
interface IVehicle {
    brand:string
    showBrand():void
}

class Car implements IVehicle {
    brand
    wheels

    constructor(brand: string, wheels: number) {
        this.brand = brand
        this.wheels = wheels
    }

    showBrand(): void {
        console.log(`A marca do carro é ${this.brand}`)
    }
    
}

const fusca = new Car("VW", 4)

fusca.showBrand();


// heranca
class SuperCar extends Car {
    engine

    constructor(brand: string, wheels: number, engine: number) {
        super(brand, wheels) // super - método especial do construtor
        this.engine = engine
    }
}

const a4 = new SuperCar("Audi", 4, 2.0);

console.log(a4);
a4.showBrand();



// decorators - função para validar dados
// obs: todo decorator retorno uma outra função

// constructor decorator
function BaseParamaters() {
    return function <T extends {new (...args: any[]): {}}>(constructor: T) {
        return class extends constructor {
            id = Math.random()
            createdAt = new Date()
        }
    }
}

// todo @ em codigo TS são decorators
// inserindo 2 propriedades aos objetos que são criados apartir da class Person
@BaseParamaters()
class Person {
    name

    constructor(name: string) {
        this.name = name
    }
}

const sam = new Person("Sam")

console.log(sam);



/*
    Type Assertions - utilizado para consumir API
    O objeto {} as deve seguir o padrão do UserResonse
*/
type UserResponse = {
    ui: number;
    name: string;
    avatar: string;
}
let userResponse = {} as UserResponse;
userResponse.name

// Tipagem para um objeto
type Point = {
    x: number;
    y: number;
}
function printCoord(points: Point) {
    console.log(`O eixo x é: ${points.x}`);
    console.log(`O eixo x é: ${points.y}`);
}

printCoord({x: 101, y: 50});

// propriedade opcional
type NewUser = {
    name: string;
    email: string;
    age: number;
    isAdmin?: boolean;
}

let usuario: NewUser = {
    name: 'Bruno',
    email: 'bruno@gmail.com',
    age: 17
}

type Profile = {
    id: number;
    name: string;
}

type Char = {
    nickname: string;
    level: number;
}

// Union de tipos
type PlayerInfo = Profile & Char;

let info : PlayerInfo = {
    id: 1,
    name: 'Bruno',
    nickname: 'Lima',
    level: 10
}

// Interface - tipando parametro de uma função
interface Usuario {
    id: number;
    name: string;
}

function registerNewUser(newUser: Usuario) {
    newUser.name;
}


type TUser = {
    id: number;
    name: string;
}

type TPayment = {
    method: string;
}

// union de types
type TAccount = TUser & TPayment;


interface IUs {
    id: number;
    name: string;
}

interface IPayment {
    method: string;
}

interface IAccount extends IUs, IPayment {}

let xt: IAccount;

function exemplo(a, b) {
    return a + b;
}
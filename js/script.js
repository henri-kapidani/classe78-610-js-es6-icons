/*
Milestone 1
Partendo dalla struttura dati fornita, visualizzare in pagina un box per ogni icona, in cui è presente il nome dell'icona e l'icona stessa.

Milestone 2
Ciascuna icona ha una proprietà "color": utilizzare questa proprietà per visualizzare le icone del colore corrispondente.

Milestone 3
Aggiungere alla pagina una select in cui le options corrispondono ai vari tipi di icone (animal, vegetable, user). Quando l'utente seleziona un tipo dalla select, visualizzare solamente le icone corrispondenti.

BONUS
1- modificare la struttura dati fornita e valorizzare la proprietà "color" in modo dinamico: generare in modo casuale un codice colore, sapendo che la notazione esadecimale è formata dal simbolo "#" seguito da 6 caratteri alfanumerici compresi tra 0 e 9 e A e F.
2- popolare le options della select della milestone 3 dinamicamente.

Consigli del giorno
Come sempre, iniziamo prima di tutto dall'analisi e comprensione della consegna. Scomponiamo il problema in micro-passaggi logici che solamente in un secondo momento trasformeremo in codice.

Le icone presenti nella struttura dati fanno riferimento alla nota libreria Font Awesome, perciò come prima cosa assicuriamoci di aver inserito il link alla cdn nell'head della pagina.
Dopodiché, basandoci sul codice di riferimento nel sito di Font Awesome, analizziamo come è formato il tag <i> di un'icona qualsiasi, in particolare focalizziamoci sulle classi.
Come possiamo usare i dati presenti nella nostra struttura dati per creare l'elemento html nel modo corretto e visualizzare l'icona in pagina?

Inizialmente può essere sufficiente stampare dei semplici div, senza alcuno stile, con all'interno l'icona e uno span con il nome. Solamente quando la parte logica è completa, ci dedichiamo al css.
*/

const arrIcons = [
	{
		name: 'cat',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas',
		color: 'orange',
	},
	{
		name: 'crow',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas',
		color: 'orange',
	},
	{
		name: 'dog',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas',
		color: 'orange',
	},
	{
		name: 'dove',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas',
		color: 'orange',
	},
	{
		name: 'dragon',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas',
		color: 'orange',
	},
	{
		name: 'horse',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas',
		color: 'orange',
	},
	{
		name: 'hippo',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas',
		color: 'orange',
	},
	{
		name: 'fish',
		prefix: 'fa-',
		type: 'animal',
		family: 'fas',
		color: 'orange',
	},
	{
		name: 'carrot',
		prefix: 'fa-',
		type: 'fruit',
		family: 'fas',
		color: 'green',
	},
	{
		name: 'apple-alt',
		prefix: 'fa-',
		type: 'fruit',
		family: 'fas',
		color: 'green',
	},
	{
		name: 'lemon',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas',
		color: 'green',
	},
	{
		name: 'pepper-hot',
		prefix: 'fa-',
		type: 'vegetable',
		family: 'fas',
		color: 'green',
	},
	{
		name: 'user-astronaut',
		prefix: 'fa-',
		type: 'user',
		family: 'fas',
		color: 'blue',
	},
	{
		name: 'user-graduate',
		prefix: 'fa-',
		type: 'user',
		family: 'fas',
		color: 'blue',
	},
	{
		name: 'user-ninja',
		prefix: 'fa-',
		type: 'cosa',
		family: 'fas',
		color: 'blue',
	},
	{
		name: 'user-secret',
		prefix: 'fa-',
		type: 'alien',
		family: 'fas',
		color: 'blue',
	},
];

const eleIconsContainer = document.querySelector('#icons-container');
const eleSelect = document.querySelector('#type-filter');

// stampare le card delle icone
populateSelect(arrIcons, eleSelect);
randomizeColors(arrIcons);
renderIcons(arrIcons, eleIconsContainer);
eleSelect.addEventListener('change', filterIcons);


// FUNCTIONS

function renderIcons(arrData, eleContainer) {
	eleContainer.innerHTML = '';
	arrData.forEach(objIcon => eleContainer.innerHTML += generateCard(objIcon));

	// for (let i = 0; i < arrData.length; i++) {
	// 	const objIcon = arrData[i];
	// 	eleContainer.innerHTML += generateCard(objIcon);
	// }
}

function generateCard(objData) {
	return `
		<div class="box">
			<i class="${objData.family} ${objData.prefix}${objData.name}" style="color:${objData.color}"></i>
			<div class="title">${objData.name}</div>
		</div>
	`;
}

function populateSelect(arrData, eleSelect) {
	// estrapolare i type dall'array dei dati
	const arrTypes = [];
	arrData.forEach(objIcon => arrTypes.includes(objIcon.type) ? '' : arrTypes.push(objIcon.type));

	// oppure
	// arrData.forEach(objIcon => {
	// 	if (!arrTypes.includes(objIcon.type)) {
	// 		arrTypes.push(objIcon.type);
	// 	}
	// });

	// oppure
	// const arrTypes = [...new Set(arrData.map(objIcon => objIcon.type))];

	console.log(arrTypes);

	// aggiungere le options per ciscun tipo
	arrTypes.forEach(type => eleSelect.innerHTML += `<option value="${type}">${type}</option>`);
}

function filterIcons() {
	const selectedType = this.value; // qui avrebbe funzionato anche eleSelect essendo in scope, ma ci sono casi in cui la variabile non e' in scope, il this funziona sempre

	// filtrare array
	if (selectedType !== '') {
		arrIconsFiltered = arrIcons.filter(objIcon => objIcon.type === selectedType)
	} else {
		arrIconsFiltered = arrIcons;
	}
	console.log(arrIconsFiltered);

	// renderizzare array delle icone filtrate
	renderIcons(arrIconsFiltered, eleIconsContainer);
}

function randomizeColors(arrIcons) {
	arrIcons.forEach(objIcon => objIcon.color = getRandomColor());
}

function getRandomColor() {
	const acceptableChars = '0123456789ABCDEF';
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += acceptableChars[getRandomInteger(0, 15)];
	}
	return color; // #xxxxxx
}

function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}
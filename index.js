const searchForm= document.querySelector('form');
const searchResdiv=document.querySelector('.search-result');
const container=document.querySelector(".container");

let searchQuery='';
const aid='0c0e54bb';
const akey='dbeb98c20eb0ff3bf2e066687d6a2a84';

searchForm.addEventListener('submit',(e)=>{
	e.preventDefault();
	searchQuery=e.target.querySelector('input').value;
	fetchAPI();
});

async function fetchAPI(){
	const burl=`https://api.edamam.com/search?q=${searchQuery}&app_id=${aid}&app_key=${akey}&to=20`;
	const res=await(fetch(burl));
	const data=await res.json();
	generateHTML(data.hits);
	/*
		const errorHTML='';
		errorHTML+=`
		<div class="item">
			<img src="${results.recipe.image}" alt=" ">
			<div class="flex-container">
				<h1 class="title">This is Receipe is currently not available</h1>
				<a class="v-button" href="#">View Recipe</a>	
			</div>
				<p class="item-data">calories: 120px</p>	
	</div>`;
	searchResdiv.innerHTML=errorHTML;
	}*/
	console.log(data);
}

function generateHTML(results){
	container.classList.remove("initial");
	let generatedHTML='';
	results.map(results =>{
		generatedHTML+=`
		<div class="item">
			<img src="${results.recipe.image}" alt=" ">
			<div class="flex-container">
				<h1 class="title">${results.recipe.label}</h1>
				<a class="v-button" href="${results.recipe.url}" target="_blank">View Recipe</a>	
			</div>
				<p class="item-data">Calories: ${results.recipe.calories.toFixed(2)}</p>	
				<p class="item-data">Diet: ${results.recipe.dietLabels.length > 0 ?results.recipe.dietLabels: "Healthy😋"}</p>	
				
	</div>`
	})
	searchResdiv.innerHTML=generatedHTML;
}
// init selectors:
const $searchBox = $("#input-box");
let $imgRow = $("#image-row");

// function to append images to grid row, passes in api results as argument, checks if results are true, creates new col and new image using res object and random index to get a random image each time, appends img to col then to row:
function appendGif(res) {
	let numResults = res.data.length;
	if (numResults) {
		let randomIdx = Math.floor(Math.random() * numResults);
		let $newCol = $("<div>").addClass("col-md-4 col-12");
		let $newImg = $("<img>", {
			src: res.data[randomIdx].images.original.url,
			class: "img-fluid border rounded m-1 w-100",
		});
		$imgRow.append($newCol.append($newImg));
	}
}

// event listener on form submission, prevent default, pass in searchbox value into axios get request, then clear search box, passes in results to appendGif function:
$("#form-submit").on("submit", async function (e) {
	e.preventDefault();
	let searchValue = $("#input-box").val();
	$searchBox.val("");
	const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
		params: {
			q: searchValue,
			api_key: "RaVsSb2hNEn2uViyxITIA1vDS1vI0ihU",
		},
	});
	appendGif(res.data);
});

// event listener on click for remove button, clears all images from row:
$("#clear").on("click", function () {
	$imgRow.empty();
});

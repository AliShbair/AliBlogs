// query the delete btn (frontend job) then fetch the wanted path with (delete method)
// then get the redirect json (server side) and handle it the next step
const deleteBtn = document.querySelector(".delete");
const storedID = deleteBtn.getAttribute("data-doc");
console.log(storedID);
deleteBtn.addEventListener("click", (e) => {
  const endpoint = `/blogs/${storedID}`;
  fetch(endpoint, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => (window.location.href = data.redirect))
    .catch((err) => console.log(err));
});

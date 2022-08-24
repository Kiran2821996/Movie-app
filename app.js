// =====Selectors======
const taskBtn = document.querySelector(".task-button");
const modalCont = document.querySelector(".task-modal");
const cancelBtn = document.querySelector(".cancel-btn");
const priorityColor = document.querySelectorAll(".priority-color-big");
const priorityColor1 = document.querySelectorAll(".priority-color-big1");
const doneBtn = document.querySelector(".done-btn");
const mainCont = document.querySelector(".task-cont");
const movieName = document.querySelector(".text");
const movieActor = document.querySelector("#movie-actor");
const movieImage = document.querySelector("#movie-image");
const movieTrailer = document.querySelector("#movie-trailer");
const movieDirector = document.querySelector("#movie-director");
const genreContainer = document.querySelector(".genre-container");
const ratingContainer = document.querySelector(".rating-container");
const priorityColorSmall = document.querySelectorAll(".priority-color-small");
const priorityColorSmall1 = document.querySelectorAll(".priority-color-small1");
const taskItem = document.querySelectorAll(".task-item");
const searchInput = document.querySelector("#search")
// console.log(selectColor);


// =====Global variables====
let priority = ["action", "romance", "comedy", "anime"];
let rating = ["Rating-0", "Rating-1", "Rating-2", "Rating-3", "Rating-4", "Rating-5"];
let selectPriority = priority[priority.length - 1];
let selectRating = rating[rating.length - 1];
let taskArr = [];
// ===========================Modal======================//
taskBtn.addEventListener("click", (e) => {
  // Display modal
 
  modalCont.style.display = "flex";
  mainCont.classList.toggle("blur");
});

cancelBtn.addEventListener("click", (e) => {
  // hide modal
  modalCont.style.display = "none";
  mainCont.classList.toggle("blur");
});

// Select priority
priorityColor.forEach((element, idx) => {
  // priorityColor.forEach(element)

  element.addEventListener("click", (e) => {
    priorityColor.forEach((em) => {
      em.classList.remove("active");
    });
    // selectRating=rating[idx]
    selectPriority = priority[idx];
    e.target.classList.add("active");
  });
});
priorityColor1.forEach((element, idx) => {
  // priorityColor.forEach(element)

  element.addEventListener("click", (e) => {
    priorityColor1.forEach((em) => {
      em.classList.remove("active");
    });
    selectRating = rating[idx];
    //   selectPriority = priority[idx];
    e.target.classList.add("active");
  });
});

// ==========================Create tasks=======================//
doneBtn.addEventListener("click", (e) => {
  createTask(
    selectPriority,
    selectRating,
    movieName.value,
    movieImage.value,
    movieTrailer.value,
    movieDirector.value,
    movieActor.value,
    true
  );
  //   setModalDefault();
  // mainCont.classList.toggle("blur");
});

// function setModalDefault() {
//   modalCont.style.display = "none";
//   movieName.value = "";
//   selectPriority = priority[priority.length - 1];
//   priorityColor.forEach((em) => {
//     em.classList.remove("active");
//   });

//   priorityColor[priorityColor.length - 1].classList.add("active");
// }

function createTask(
  selectPriority,
  selectRating,
  movieName,
  movieImage,
  movieTrailer,
  movieDirector,
  movieActor,
  newTask = true,
  id = Date.now()
) {
  let taskCont = document.createElement("div");
  taskCont.setAttribute("class", "task-item");
  taskCont.innerHTML = `
                                <div class="priority-task ${selectPriority}">
                                </div>
                             
                                <div class="movieName"> ${movieName}</div>
                                <div class="commondiv">
                                <div class="div1"> 
                                <a href="${movieTrailer}" target="_blank"><img src="${movieImage}" width="100px" height="100px" alt=""></a>
                                </div>
                                <div class="div2">  
                                <div class="movieRating">${selectRating}/5</div>
                                <div class="movieDirector">Director:  ${movieDirector}</div>
                                <div class="movieDirector">Actor:  ${movieActor}</div>
                                </div>
                              </div>
                                <div class="lock ${id}">
                                </div>`;
  if (newTask) {
    taskArr.push({
      selectPriority,
      selectRating,
      movieName,
      movieImage,
      movieTrailer,
      movieDirector,
      movieActor,
      id,
    });
  }
  mainCont.appendChild(taskCont);
  // console.log(taskArr)
}

//=============================== Sorting by color========================
genreContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("priority-color-small")) {
    priorityColorSmall.forEach((em) => {
      em.classList.remove("active");
    });
    e.target.classList.add("active");

    mainCont.textContent = null;
    if (e.target.classList.contains("all")) {
      taskArr.forEach((el) => {
        createTask(
          el.selectPriority,
          el.selectRating,
          el.movieName,
          el.movieImage,
          el.movieTrailer,
          el.movieDirector,
          el.movieActor,
          false,
          el.id
        );
      });
    } else {
      const targetPriority = e.target.classList[1];

      taskArr.forEach((el) => {
        if (el.selectPriority === targetPriority) {
          createTask(
            el.selectPriority,
            el.selectRating,
            el.movieName,
            el.movieImage,
            el.movieTrailer,
            el.movieDirector,
            el.movieActor,
            false,
            el.id
          );
        }
      });
    }
  }
});
ratingContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("priority-color-small1")) {
    priorityColorSmall1.forEach((em) => {
      em.classList.remove("active");
    });
    e.target.classList.add("active");

    mainCont.textContent = null;
    if (e.target.classList.contains("ratingall")) {
        taskArr.forEach((el) => {
          createTask(
            el.selectPriority,
            el.selectRating,
            el.movieName,
            el.movieImage,
            el.movieTrailer,
            el.movieDirector,
            el.movieActor,
            false,
            el.id
          );
        });
      }else{
        const targetPriority = e.target.classList[1];

        taskArr.forEach((el) => {
          if (el.selectRating === targetPriority) {
            createTask(
              el.selectPriority,
              el.selectRating,
              el.movieName,
              el.movieImage,
              el.movieTrailer,
              el.movieDirector,
              el.movieActor,
              false,
              el.id
            );
          }
        });
      }

   
  }
});

searchInput.addEventListener("input", e => {
 
  // const a2 =e.target.parentElement.nextElementSibling.nextElementSibling.childNodes.classList[3];
  // console.log(a1)
  const value = e.target.value
  taskArr.forEach((el) => {
    if (el.movieName == value||el.movieDirector==value||el.movieActor==value) {
      createTask(
        el.selectPriority,
        el.selectRating,
        el.movieName,
        el.movieImage,
        el.movieTrailer,
        el.movieDirector,
        el.movieActor,
        false,
        el.id
      );
    }else{
      mainCont.textContent = null;
    }
  });
})
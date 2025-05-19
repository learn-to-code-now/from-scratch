let editor;
let currentLesson = 1;

window.onload = () => {
  editor = CodeMirror.fromTextArea(document.getElementById("codeEditor"), {
    lineNumbers: true,
    mode: "javascript",
    theme: "default"
  });
  loadLesson(currentLesson);
};

function loadLesson(nr) {
  fetch(`js/lessons/lesson${nr}.json`)
    .then(res => {
      if (!res.ok) throw new Error("Lesson not found");
      return res.json();
    })
    .then(data => {
      document.getElementById("lessonTitle").innerText = `Lesson ${data.id}: ${data.title}`;
      document.getElementById("lessonInstruction").innerText = data.instruction + "\n\nExample:\n" + data.example;
      editor.setValue("// Type your code here...");
      document.getElementById("output").textContent = "";
      document.getElementById("feedback").textContent = "";
    })
    .catch(err => {
      document.getElementById("lessonTitle").innerText = "No more lessons.";
      document.getElementById("lessonInstruction").innerText = "";
      editor.setValue("");
    });
}

function runLesson() {
  validateCode(editor.getValue(), currentLesson);
}

function nextLesson() {
  currentLesson++;
  loadLesson(currentLesson);
}

function prevLesson() {
  if (currentLesson > 1) {
    currentLesson--;
    loadLesson(currentLesson);
  }
}

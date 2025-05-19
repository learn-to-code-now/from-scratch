function validateCode(code, lessonId) {
  fetch(`js/lessons/lesson${lessonId}.json`)
    .then(res => res.json())
    .then(lesson => {
      let output = "";
      const originalLog = console.log;
      console.log = (...args) => output += args.join(" ") + "\n";

      try {
        eval(code);
        console.log = originalLog;

        document.getElementById("output").textContent = output.trim();

        // check for required contents
        for (let mustContain of lesson.validation.contains) {
          if (!code.includes(mustContain)) {
            document.getElementById("feedback").textContent = `❌ Your code must include: ${mustContain}`;
            return;
          }
        }

        // check output
        if (output.trim() === lesson.validation.exactOutput) {
          document.getElementById("feedback").textContent = "✅ Correct!";
        } else {
          document.getElementById("feedback").textContent = `⚠️ Output was: "${output.trim()}" – expected: "${lesson.validation.exactOutput}"`;
        }
      } catch (e) {
        console.log = originalLog;
        document.getElementById("feedback").textContent = `❌ Error: ${e.message}`;
        document.getElementById("output").textContent = "";
      }
    });
}

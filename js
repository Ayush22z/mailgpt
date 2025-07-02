async function generateEmail() {
  const command = document.getElementById("commandInput").value;
  const output = document.getElementById("output");
  const outputSection = document.getElementById("outputSection");

  if (!command.trim()) {
    output.innerText = "⚠️ Please enter a command.";
    outputSection.style.display = "block";
    return;
  }

  output.innerText = "⏳ Generating email...";
  outputSection.style.display = "block";

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",  // 🔁 Replace this
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a professional email assistant. Generate full, formal, polite emails with greeting, subject, body, and closing."
          },
          {
            role: "user",
            content: `Write an email for this instruction:\n\n"${command}"`
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      output.innerText = data.choices[0].message.content.trim();
    } else {
      output.innerText = "❌ No response from OpenAI.";
      console.log(data);
    }
  } catch (error) {
    output.innerText = "❌ Error occurred. Check browser console.";
    console.error(error);
  }
}

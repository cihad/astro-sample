// alert("hello")

let ast = null;

document.addEventListener("mouseover", async (e) => {
  console.log(e.target);
  if (!e.target) return;

  if (!ast) {
    let res = await fetch("/ast.json?path=index.astro");
    res = await res.json();
    ast = res.ast;
  }

  console.log({ ast });

  const target = e.target;
  const payload = {
    rect: target.getBoundingClientRect(),
    element: target.nodeName,
  };

  if (target instanceof HTMLParagraphElement) {
    payload["innerText"] = target.innerText;
  }

  window.parent.postMessage(
    {
      type: "hover",
      payload,
    },
    "*"
  );
});

window.addEventListener("message", (e) => {});

document.addEventListener("dblclick", (e) => {
  const target = e.target;
  if (e.target instanceof HTMLParagraphElement) {
    const response = prompt("New text", target.innerText);

    if (!response) return;
    target.innerText = response;
  }
});

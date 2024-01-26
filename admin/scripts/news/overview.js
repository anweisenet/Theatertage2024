async function createNewsOverview() {
  const data = await readFile();

  // skip first row (titles/names)
  for (let i = 1; i < data.length; i++) {
    createNewsOverviewFor(i, data[i]);
  }
}

const newsContainer = document.getElementById("news");

function createNewsOverviewFor(index, post) {
  // create element & load preset
  const element = $("<div>");
  const jqElement = $(element);
  jqElement.load("/admin/preset/news_overview.html", () => {
    const entry = jqElement.find(".entry");

    entry.find(".title").text(post[NewsRow.Headline])
    entry.find(".date").text(dateFormat.format(post[NewsRow.Date]))
    entry.find(".summary").text(post[NewsRow.Summary])
    entry.attr("href", `./post?ID=${index}`)
    
    $(newsContainer).append(entry);
  })
}

createNewsOverview().then(undefined);

fetch("/blogs").then((data) => {
    // console.log(data); json format
    return data.json(); //converted into object
}).then((objectData) => {
    // console.log(objectData[0]);
    let blogTableData = "";
    objectData.map((values) => {
        // console.log(values);
        blogTableData += `<tr>
        <td>${values.blogId}</td>
        <td>${values.title}</td>
        <td><img src="${values.imagepath}" alt=""/></td>
        <td>${values.description}</td>
        <td>${values.author}</td>
        <td>${values.publisheddate}</td>
        <td>
            <div>
                <i class="address-edit fas fa-edit" id="${values.blogId}" aria-hidden="true"></i><i class="address-delete fas fa-trash-alt" id="${values.blogId}" aria-hidden="true"></i>
            </div>
        </td>
    </tr>`;
    });
    document.getElementById("blog_data").innerHTML = blogTableData;
})
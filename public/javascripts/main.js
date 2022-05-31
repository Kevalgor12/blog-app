fetch("/users/blogs").then((data) => {
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
            <i class="address-edit fa fa-edit" id="${values.blogId}" aria-hidden="true" onclick="EditBlog(${values.blogId})"></i>&nbsp;<i class="address-delete fa fa-trash" id="${values.blogId}" aria-hidden="true" onclick="deleteBlog(${values.blogId})"></i>
        </td>
    </tr>`;
    });
    return document.getElementById("blog_data").innerHTML = blogTableData;
});

const deleteBlog = async (blogId) => {
    try{ 
        return await fetch(`/users/delete/${blogId}`, {
            method: 'DELETE'
        });
    } catch (err) {
        console.log(err);
    }
}

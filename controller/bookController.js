const books = require("../model/bookModel")


exports.addBookcontroller = async (req, res)=> {
    console.log("Inside Add Book Controller");
    const {title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category} = req.body
    

    // const uploadImages = req.files

    var uploadImages = []
    req.files.map((item) => uploadImages.push(item.filename))
    
    const userMail = req.payload

    console.log(title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category, uploadImages, userMail);

    try{
        const existingBook = await books.findOne({title, userMail})
        if(existingBook){
            res.status(401).json(`You have already added the book`)
        }else{
            const newBook = new books({
                title, author, noOfPages, imageUrl, price, dPrice, abstract, publisher, language, isbn, category, uploadImages, userMail
            })
            await newBook.save()
            res.status(200).json(newBook)
        }
    }catch(error){
        res.status(500).json(error)
    }    
}
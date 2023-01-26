import Category from "../model/categorySchema.js"

export const createCategory = async (req, res) => {
    const { category } = req.body
    if (!category) { res.json({ alert: "Please Enter Category" }) }
    else {
        const findCategory = await Category.findOne({ category: category })
        if (findCategory) {
            res.json({ alert: "Category already exists!" })
        } else {
            const create = await new Category({ category })
            if (create) {
                await create.save()
                res.json({ success: "Created" })
            } else {
                res.json({ error: "Error" })
            }
        }
    }
}

export const getCategory = async (req, res) => {
    const find = await Category.find()
    res.json(find)
}

export const createItem = async (req, res) => {
    const { category, name, description, image, price, available } = req.body.product
    let item = {
        name: name,
        description: description,
        image: image,
        price: price,
        available: available
    };
    try {
        const findcategory = await Category.findOne({ category: category });
        findcategory.items = findcategory.items.concat(item)
        await findcategory.save()
        res.json({ success: findcategory });
    } catch (err) {
        res.status(500).json({ error: 'Error adding items to category' });
    }
}

export const updateItem = async (req, res) => {
    const { category, name, description, image, price, available, id } = req.body.product
    let items = {
        name: name,
        description: description,
        image: image,
        price: price,
        available: available,
        _id: id
    };
    const findCategory = await Category.findOne({ category: category })
    if (findCategory) {
        const indexx = await findCategory.items.findIndex(item => item._id == id)
        findCategory.items[indexx] = items
        findCategory.save()
        res.json({ success: findCategory.items[indexx], category: category })
    } else {
        res.json({ alert: "No Product Found" })
    }
}

export const deleteItem = async (req, res) => {
    const { category, id } = req.query
    const findCategory = await Category.findOne({ category: category })
    if (findCategory) {
        const indexx = await findCategory.items.findIndex(item => item._id == id)
        const item = findCategory.items[indexx]
        const del = findCategory.items.filter(item => item._id != id)
        findCategory.items = del
        const deleted = findCategory.save()
        if (deleted) {
            res.json(req.query)
        } else {
            res.json({ error: "Can't Delete" })
        }

    } else {
        res.json({ alert: " Product Not Found" })
    }
}

export const editCategory = async (req, res) => {
    const { category, id } = req.body.product
    const findCategory = await Category.findById(id)
    if (findCategory) {
        findCategory.category = category
        await findCategory.save()
        res.json(req.body.product)
    } else {
        res.json({ alert: "Category Not Found" })
    }
}

export const deleteCategory = async (req, res) => {
    const { id } = req.query;
    const result = await Category.findOneAndDelete({ _id: id });

    if (result) {
        res.json(result);
    } else {
        res.json({ alert: "No Category Found" });
    }
};
import PostService from '../service/PostService.js';

class PostController {
    async create(req, res) {
        try {
            const result = await PostService.create(req.body);
            if (result) {
                res.json({ message: "Message is done", result });
            }
        } catch (err) {
            res.status(500).json({ error: err.toString() });
        }
    }

    async getAll(req, res) {
        try {
            const result = await PostService.getAll();
            if (result) {
                res.json(result)
            }
        } catch (err) {
            res.status(500).json({ error: err.toString() });
        }
    }

    async getOne(req, res) {
        try {
            const result = await PostService.getOne(req.params.id);
            if (result) {
                res.status(200).json(result)
            }
        } catch (err) {
            res.status(500).json({ error: err.toString() });
        }
    }

    async update(req, res) {
        try {
            // const result = await PostService.update(req.body)
            if(1 == 1){
                console.log("555")
                res.json({ message: "Message is done"});
            }

        } catch (err) {
            res.status(500).json({ error: err.toString() });
        }
    }

    async deleteOne(req, res) {
        try {
            pool.getConnection((err, connection) => {
                if (err) {
                    res.status(500).json(err);
                    return;
                }
                console.log(`connected as id ${connection.threadId}`);

                const { id } = req.params;
                if (!id) {
                    res.status(400).json('id is undefind')
                }

                const sql = `DELETE FROM post WHERE id = ?`;

                connection.query(sql, [id], (err, rows) => {
                    if (!err) {
                        res.json(rows);
                    } else {
                        res.status(500).json(err);
                    }
                })
            })
        } catch (err) {
            res.status(500).json({ error: err.toString() });
        }
    }
}

export default new PostController;
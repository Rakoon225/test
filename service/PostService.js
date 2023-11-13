import pool from '../pool.js'

class PostService {
    async create(post) {
        return new Promise((resolve, reject) => {
            const { title, author, content, picture } = post;
            const sql = 'INSERT INTO post (title, author, content, picture) VALUES (?, ?, ?, ?)';
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }
                connection.query(sql, [title, author, content, picture], (err, results) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM post';
            pool.getConnection((err, connection) => {
                if (err) {
                    reject(err);
                    return;
                }
                connection.query(sql, (err, results) => {
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
        });
    }

    async getOne(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM post WHERE id = ?`;

            pool.getConnection((err, connection) => {
                connection.query(sql, [id], (err, rows) => {
                    connection.release();
                    if (!err) {
                        resolve(rows);
                    } else {
                        reject(err)
                    }
                })
            }
            )
        })
    }

    async update(post) {
        return new Promise((resolve, reject) => {

            if (!post || !post.id) {
                reject(new Error("Post object or ID is missing."));
                return;
            }

            const updateFields = [];
            const updateValues = [];

            for (const [key, value] of Object.entries(post)) {
                if (value && key !== 'id') {
                    updateFields.push(`${key} = ?`);
                    updateValues.push(value);
                }
            }

            updateValues.push(post.id);

            const sql = `UPDATE post SET ${updateFields.join(', ')} WHERE id = ?`;

            connection.query(sql, updateValues, (err, rows) => {
                if (!err) {
                    resolve(555)
                } else {
                    reject(err)
                }
            })
        })
    }
};

export default new PostService;
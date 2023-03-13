const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./DB.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err && err.code == "SQLITE_CANTOPEN") {
        db = new sqlite3.Database('DB.db', (err) => {
            if (err) {
                console.log("Getting error " + err);
                exit(1);
            }
            createTables();
        });
        return;
    } else if (err) {
        console.log("Getting error " + err);
        exit(1);
    }
});


function createTables() {
    db.exec(`
    create table user (
        id int primary key not null,
        email text not null unique,
        pass text not null
    );
    
    insert into user (id, email, pass)
        values  (1, 'user1', '123'),
                (2, 'user2', '123'),
                (3, 'user3', '123'),
                (4, 'user4', '123'),
                (5, 'user5', '123'),
                (6, 'user6', '123'),
                (7, 'user7', '123');

    create table token(
        user_id int not null,
        token text not null,
        foreign key (user_id) references user(id)
    );

    create table workspaces (
        user_id int primary key not null,
        workspaces text,
        foreign key (user_id) references user(id)
    );

    insert into workspaces (user_id, workspaces)
        values  (1, "[]"),
                (2, "[]"),
                (3, "[]"),
                (4, "[]"),
                (5, "[]"),
                (6, "[]"),
                (7, "[]");

    create table workspaces_convert (
        user_id int primary key not null,
        workspaces text,
        foreign key (user_id) references user(id)
    );

    insert into workspaces_convert (user_id, workspaces)
        values  (1, "[]"),
                (2, "[]"),
                (3, "[]"),
                (4, "[]"),
                (5, "[]"),
                (6, "[]"),
                (7, "[]");

                `, () => {
    });
}

module.exports = db
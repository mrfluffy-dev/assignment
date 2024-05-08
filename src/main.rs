use actix_web::{web, get, App, HttpServer, HttpResponse, Responder};
use isahc::config::Configurable;
use isahc::{ReadResponseExt, Request, RequestExt};
use serde::{Serialize};


#[derive(Debug, Serialize)]
struct People {
    name: String,
    height: String,
    mass: String,
    hair_color: String,
    skin_color: String,
    eye_color: String,
    birth_year: String,
    gender: String,
}

fn search_people(query: String) -> People {
    use serde_json::Value;

    let req = Request::builder()
        .uri(format!(
            "https://swapi.dev/api/people/?search={}",
            query
        ))
        .redirect_policy(isahc::config::RedirectPolicy::Follow)
        .header("user-agent", "uwu")
        .body(())
        .unwrap();

    let mut response = match req.send() {
        Ok(response) => response,
        Err(e) => {
            panic!("Error sending HTTP request: {}", e);
        }
    };

    let json_str = match response.text() {
        Ok(text) => text,
        Err(e) => {
            panic!("Error retrieving response body: {}", e);
        }
    };

    let json: Value = match serde_json::from_str(&json_str) {
        Ok(value) => value,
        Err(e) => {
            panic!("Error parsing JSON: {}", e);
        }
    };

    let mut person = People {
        name: String::new(),
        height: String::new(),
        mass: String::new(),
        hair_color: String::new(),
        skin_color: String::new(),
        eye_color: String::new(),
        birth_year: String::new(),
        gender: String::new(),

    };


    if let Some(results) = json["results"].as_array() {
        for people in results.iter() {
            person.name =
                people["name"]
                    .as_str()
                    .unwrap()
                    .to_string();
            person.height =
                people["height"]
                    .as_str()
                    .unwrap()
                    .to_string();
            person.mass =
                people["mass"]
                    .as_str()
                    .unwrap()
                    .to_string();
            person.hair_color =
                people["hair_color"]
                    .as_str()
                    .unwrap()
                    .to_string();
            person.skin_color =
                people["skin_color"]
                    .as_str()
                    .unwrap()
                    .to_string();
            person.eye_color =
                people["eye_color"]
                    .as_str()
                    .unwrap()
                    .to_string();
            person.birth_year =
                people["birth_year"]
                    .as_str()
                    .unwrap()
                    .to_string();
            person.gender =
                people["gender"]
                    .as_str()
                    .unwrap()
                    .to_string();
        }

    } else {
        let status = response.status();
        if status.is_client_error() || status.is_server_error() {
            panic!("HTTP request failed with status code {}", status);
        } else {
            panic!("JSON response is missing 'results' field");
        }
    }

   person
}


#[get("/api/{name}")]
async fn index(name: web::Path<String>) -> impl Responder {
    let name = name.into_inner();
    let person = search_people(name);
    //print all attributes of the person
    println!("name: {} height: {} mass: {} hair_color: {} skin color: {} eye_color: {} birth_year: {} gender: {}",
             person.name, person.height, person.mass, person.hair_color, person.skin_color, person.eye_color, person.birth_year, person.gender);
    HttpResponse::Ok().json(person)
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(index)
            .service(actix_files::Files::new("/", "public").index_file("pages/index.html"))
    })
    .bind(("0.0.0.0", 4200))?
    .run()
    .await
}


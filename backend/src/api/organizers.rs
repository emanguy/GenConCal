use std::sync::{Arc, OnceLock};
use axum::extract::State;
use axum::response::ErrorResponse;
use axum::Router;
use axum::routing::get;
use fake::{Fake, Faker};
use rand::seq::index::sample;
use utoipa::OpenApi;
use crate::{dto, AppState, SharedData};
use crate::external_connections::ExternalConnectivity;
use crate::routing_utils::Json;
use log::*;

#[derive(OpenApi)]
#[openapi(paths(list_organizer_groups))]
pub struct OrganizersApi;

pub const ORGANIZERS_API_GROUP: &str = "Organizers";

pub fn organizers_routes() -> Router<Arc<SharedData>> {
    Router::new()
        .route(
            "/groups",
            get(
                |State(app_data): AppState| async move {
                    let mut ext_cxn = app_data.ext_cxn.clone();
                    
                    list_organizer_groups(&mut ext_cxn).await
                }
            ),
        )
}

pub(super) fn sample_organizer_groups() -> &'static [dto::Group] {
    static ORGANIZER_GROUPS: OnceLock<[dto::Group; 5]> = OnceLock::new();
    let groups_ref = ORGANIZER_GROUPS.get_or_init(|| [
        Faker.fake(),
        Faker.fake(),
        Faker.fake(),
        Faker.fake(),
        Faker.fake(),
    ]);
    
    groups_ref
}

#[utoipa::path(
    get,
    path = "/api/organizers/groups",
    tag = ORGANIZERS_API_GROUP,
    responses(
        (status = 200, description = "Organizers successfully retrieved", body = [Group]),
        (status = 500, response = dto::err_resps::BasicError500),
    )
)]
/// List known organizing groups for the current GenCon year
async fn list_organizer_groups(_ext_cxn: &mut impl ExternalConnectivity) -> Result<Json<&'static [dto::Group]>, ErrorResponse> {
    info!("Retrieved organizer groups.");
    Ok(Json(sample_organizer_groups()))
}
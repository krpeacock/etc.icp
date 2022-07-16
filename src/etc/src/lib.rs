use candid::export_service;
use ic_cdk::{
    api::call::ManualReply,
    export::candid::{candid_method, }
};
use ic_certified_map::Hash;
use sha2::{Digest, Sha256};

use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::BTreeMap;
use std::str;

type UrlStore = BTreeMap<String, String>;

thread_local! {
    static URL_STORE: RefCell<UrlStore> = RefCell::default();
}

fn create_uuid(url: String) -> String {
    return hash_string(&url);
}
pub fn hash_string(value: &str) -> String {
    let bytes = hash_bytes(value.as_bytes());

    let s = hex::encode(&bytes[0..12]);
    return s.to_string();
}

pub fn hash_bytes(value: impl AsRef<[u8]>) -> Hash {
    let mut hasher = Sha256::new();
    hasher.update(value.as_ref());
    hasher.finalize().into()
}

#[candid_method(update)]
#[update(name = "shortenBasic", manual_reply = true)]
fn shorten_basic(url: String) -> ManualReply<String> {
    URL_STORE.with(|url_store| {
        let mut url_store = url_store.borrow_mut();
        if let Some(existing) = url_store.get(&url) {
            return ManualReply::one(existing.clone());
        } else {
            let uuid = create_uuid(url.clone());
            url_store.insert(uuid.clone(), url.clone());
            return ManualReply::one(uuid);
        }
    })
}

#[candid_method(query)]
#[query(manual_reply = true)]
fn get(name: String) -> ManualReply<String> {
    URL_STORE.with(|url_store| {
        if let Some(url) = url_store.borrow().get(&name) {
            return ManualReply::one(url);
        } else {
            return ManualReply::one(String::default());
        }
    })
}

export_service!();

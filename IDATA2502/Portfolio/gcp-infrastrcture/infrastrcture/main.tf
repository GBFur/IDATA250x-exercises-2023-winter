provider "google" {
  credentials = file("tidy-visitor-400612-a3125c72f5ed.json")
  project     = "tidy-visitor-400612"
  region      = "europe-west2"
}

resource "google_compute_instance" "default" {
  name         = "terraform-instance"
  machine_type = "e2-micro"
  zone         = "europe-west2-b"

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11-bullseye-v20231010"
    }
  }

  network_interface {
    network = "default"
  }
}

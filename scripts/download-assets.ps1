# Download all Petcheri Webflow CDN assets to public/assets/
# Run from project root: pwsh scripts/download-assets.ps1

$BASE = "https://cdn.prod.website-files.com/66672b13a367b9ed2f297248"
$BLOG = "https://cdn.prod.website-files.com/66672b13a367b9ed2f2972b4"
$OUT  = "H:\Mes documents\Projects\Git\petcheri-webflow\public\assets"

$assets = @(
  # ── UI / Navigation ─────────────────────────────────────────────
  @{ url="$BASE/66f2d25fec1d07cb2576a43c_Capture%20d%E2%80%99e%CC%81cran%202024-09-24%20a%CC%80%2016.53.12.png"; dest="ui/logo.png" },
  @{ url="$BASE/66672b13a367b9ed2f2972d7_Menu%20Icon.svg";                                                       dest="ui/menu-icon.svg" },
  @{ url="$BASE/66672b13a367b9ed2f2972bc_MagnifyingGlass%20Grey.svg";                                            dest="ui/search.svg" },
  @{ url="$BASE/66e8724b3c324594faeb48ef_drapeau-francais-france_469558-1783.avif";                               dest="ui/flag-fr.avif" },
  @{ url="$BASE/66e8724345259906cb95f9ca_american-flag-eagle-united-states-usa-wallpaper-preview.jpg";            dest="ui/flag-en.jpg" },
  @{ url="$BASE/666734cb6d344cfbda28071a_Avis%20Google.svg";                                                     dest="ui/avis-google.svg" },
  @{ url="$BASE/669e94b44a21b661c3ed1c09_INFILTRATION%20DES%20MARQUES%20%20(3).svg";                             dest="ui/brand-watermark.svg" },
  @{ url="$BASE/66c4936ddc3ddb0ce8787b71_LOGO%20LINKS.svg";                                                      dest="ui/logo-links.svg" },
  @{ url="$BASE/672cfdd481c785b1a6d7e4cd_icone%20ordi.svg";                                                      dest="ui/ordi.svg" },

  # ── Press logos ──────────────────────────────────────────────────
  @{ url="$BASE/69fa11caa3c64f553fa6fa78_gala%20logo.png";                                                       dest="press/gala.png" },
  @{ url="$BASE/69fa11c95a5160c40b5d8a43_envoy%C3%A9%20special.jpg";                                             dest="press/envoye-special.jpg" },
  @{ url="$BASE/69fa11ca2a822939b8a9ef1a_Europe1_FLAT.png";                                                      dest="press/europe1.png" },
  @{ url="$BASE/69fa11c9b9a9ae6326b8a211_marie%20claire%20logo.png";                                             dest="press/marie-claire.png" },

  # ── Service icons (V4) ───────────────────────────────────────────
  @{ url="$BASE/6697ffc89c3f4e039a4b8d73_icone%20V4%20Dog.svg";                                                  dest="icons/dog.svg" },
  @{ url="$BASE/6697ffc8caf71739d8db5ec6_Icone%20V4%20Others.svg";                                               dest="icons/others.svg" },
  @{ url="$BASE/6697ffc8db4bfaeef70d274d_Icone%20V4%20Walking.svg";                                              dest="icons/walking.svg" },
  @{ url="$BASE/6697ffc7a37b09a1abf6b508_icone%20V4%20Bath.svg";                                                 dest="icons/bath.svg" },
  @{ url="$BASE/6697ffc85fb9217d311f8ad3_Icone%20V4%20education.svg";                                            dest="icons/education.svg" },
  @{ url="$BASE/6697ffc83810c11a54065a84_Icone%20V4%20education.png";                                            dest="icons/education.png" },
  @{ url="$BASE/6697ffc8e54a9d989cfe0978_Icone%20V4%20Care.svg";                                                 dest="icons/care.svg" },
  @{ url="$BASE/6697ffc71263eb1898055c53_icone%20V4%20Transport.svg";                                            dest="icons/transport.svg" },
  @{ url="$BASE/6697ffc7ddfa63ab5671f0a9_icone%20V4%20Travel.svg";                                               dest="icons/travel.svg" },
  @{ url="$BASE/6697ffc7f288dc4b8109c025_icone%20V4%20Sleep.svg";                                                dest="icons/sleep.svg" },
  @{ url="$BASE/6697ffc8f8642f7e9d6e39ce_icone%20V4%20Dog%20(1).png";                                            dest="icons/dog-alt.png" },
  @{ url="$BASE/6697ffc7f95718a3bcf30baf_icone%20V4%20Walking%202.svg";                                          dest="icons/walking2.svg" },
  @{ url="$BASE/6697ffc8b99daf34d95eb3ec_Icone%20V4%20Care%20.png";                                              dest="icons/care-alt.png" },
  @{ url="$BASE/6697ffc7f03b5c9595925e31_icone%20V4%20Travel%202.png";                                           dest="icons/travel2.png" },
  # CT (cat/concierge) variants
  @{ url="$BASE/66a105a410cbecba03e5b738_Icone%20V4%20CT%20Cat.svg";                                             dest="icons/ct-cat.svg" },
  @{ url="$BASE/66a105a4cfeca9db32811720_Icone%20V4%20CT%20Education.svg";                                       dest="icons/ct-education.svg" },
  @{ url="$BASE/66a105a43dc5288e4c60ee6d_Icone%20V4%20CT%20sleep.svg";                                           dest="icons/ct-sleep.svg" },
  @{ url="$BASE/66a3a127ea02a8671fd4f0d9_icone%20V4%20%20CT%20Grooming.svg";                                     dest="icons/ct-grooming.svg" },
  @{ url="$BASE/66a3a12745b349e9cd107d8f_icone%20V4%20%20CT%20Transport.svg";                                    dest="icons/ct-transport.svg" },
  @{ url="$BASE/66cf13185b79bbe20902281e_NAC.svg";                                                                dest="icons/nac.svg" },

  # ── Lifestyle photos (home testimonials / team) ──────────────────
  @{ url="$BASE/66e1b61ff710d5b5023d6d46_image22.jpg";    dest="photos/chouchouteur-1.jpg" },
  @{ url="$BASE/66e1b65fcaf9d6d1d7059d90_image32.jpg";    dest="photos/chouchouteur-2.jpg" },
  @{ url="$BASE/66e1b6fee21bfc0c3de52aca_image19.png";    dest="photos/chouchouteur-3.png" },
  @{ url="$BASE/66e1b70296f22149e285433a_image21.png";    dest="photos/chouchouteur-4.png" },
  @{ url="$BASE/66e1b6fe915ce2792a33c048_image15.png";    dest="photos/chouchouteur-5.png" },
  @{ url="$BASE/66e1b70296f22149e285432c_image13.jpg";    dest="photos/chouchouteur-6.jpg" },
  @{ url="$BASE/66e1b6fe9749887d63b40cea_image27.jpg";    dest="photos/chouchouteur-7.jpg" },
  @{ url="$BASE/66e1b6fe9e9f5e797d5b5e1c_image2.jpg";     dest="photos/chouchouteur-8.jpg" },
  @{ url="$BASE/66e1b6ff915ce2792a33c1a2_image29.jpg";    dest="photos/chouchouteur-9.jpg" },
  @{ url="$BASE/66e1b6ff10f71e4eb6d0fad3_image26.jpg";    dest="photos/chouchouteur-10.jpg" },
  @{ url="$BASE/66e1b6fec0b7960a6d64c80b_image12.jpg";    dest="photos/chouchouteur-11.jpg" },
  @{ url="$BASE/66e1b6fe525f8da1ef3833be_image16.jpg";    dest="photos/chouchouteur-12.jpg" },
  @{ url="$BASE/66e1b6fe8fbe4454ba7290a6_image20.jpg";    dest="photos/chouchouteur-13.jpg" },
  # Qui sommes-nous team photos
  @{ url="$BASE/66d886daf3783ffb16c5b077_2.png";          dest="photos/team-2.png" },
  @{ url="$BASE/66d886dae1e2e99f0d87629f_3.png";          dest="photos/team-3.png" },
  @{ url="$BASE/66d8863e50c47b9bda39afb9_4.png";          dest="photos/team-4.png" },
  # Luxury Hotels / Experience palace
  @{ url="$BASE/691f07f5c66055d169e58f91_Design%20sans%20titre-38.png";                                           dest="photos/luxury-hero.png" },
  @{ url="$BASE/6920812f4af0f80cbea8f7af_Membres%20de%20l%27%C3%A9quipe%20pr%C3%A9sentation%20(3).png";          dest="photos/luxury-3.png" },
  @{ url="$BASE/6920858ec1b795474aee110a_Membres%20de%20l%27%C3%A9quipe%20pr%C3%A9sentation%20(4).png";          dest="photos/luxury-4.png" },
  # Mood board photos (actual lifestyle shots)
  @{ url="$BASE/66e2df8fa58948490f86cdb3_Moodboard%20-%20NEW%20DA.png";                                           dest="photos/moodboard-1.png" },
  @{ url="$BASE/66e2e59dd61f609acc9c6315_Moodboard%20-%20NEW%20DA-2.png";                                         dest="photos/moodboard-2.png" },
  @{ url="$BASE/66e4595545b4f6abb1412a02_Moodboard%20-%20NEW%20DA-5.png";                                         dest="photos/moodboard-5.png" },
  @{ url="$BASE/66e45c4e66f7981576de8069_Moodboard%20-%20NEW%20DA-6.png";                                         dest="photos/moodboard-6.png" },
  # VIP Club
  @{ url="$BASE/672d05dbe0196e4a45286f02_invitation%20event%20pet%20cheri%20Save%20the%20date.png";                dest="photos/vip-invitation.png" },

  # ── Illustrations ────────────────────────────────────────────────
  @{ url="$BASE/66e4565b156253128ca93201_Illustrations%20Site%20(800%C2%A0%C3%97%C2%A0800%C2%A0px)-114.png";     dest="illustrations/cat-sitting-114.png" },
  @{ url="$BASE/66d99d1794b9a8b1bbb66485_Illustrations%20Site%20(800%C2%A0%C3%97%C2%A0800%C2%A0px)-111.png";     dest="illustrations/dog-day-111.png" },
  @{ url="$BASE/66d464baaa224da5511c95df_Illustrations%20Site%20(800%C2%A0%C3%97%C2%A0800%C2%A0px)-98.png";      dest="illustrations/about-98.png" },
  @{ url="$BASE/66cf268097796d3a321c8087_Illustrations%20Site%20(800%C2%A0%C3%97%C2%A0800%C2%A0px)-101.png";     dest="illustrations/grooming-101.png" },
  @{ url="$BASE/66e4715c8e61517cc1473f7a_Illustrations%20Site%20(800%C2%A0%C3%97%C2%A0800%C2%A0px)-7.svg";       dest="illustrations/about-7.svg" },
  @{ url="$BASE/66e4750b6bf3a2b528137c5b_Illustrations%20Site%20(800%C2%A0%C3%97%C2%A0800%C2%A0px)-115.png";     dest="illustrations/about-115.png" },
  @{ url="$BASE/66e474c36258bbc8da643ff0_35.svg";                                                                  dest="illustrations/35.svg" },
  @{ url="$BASE/66e2fde03d9585cc8834bd31_Illustrations%20Site%20(800%C2%A0%C3%97%C2%A0800%C2%A0px).svg";         dest="illustrations/base.svg" },
  @{ url="$BASE/66e2fe6b5d19f7f8224cb42b_Illustrations%20Site%20(800%C2%A0%C3%97%C2%A0800%C2%A0px)-2.svg";       dest="illustrations/base-2.svg" },
  @{ url="$BASE/66e325a1396ca7a8e7b28e91_Illustrations%20Site%20(800%C2%A0%C3%97%C2%A0800%C2%A0px)-6.svg";       dest="illustrations/base-6.svg" },
  # Why choose us icons
  @{ url="$BASE/66e2fd017977a5972f4f63a3_Planning.svg";    dest="illustrations/planning.svg" },
  @{ url="$BASE/66e2a8485e5bd0a4dd8a3c0b_Planning.svg";    dest="illustrations/planning-alt.svg" },
  @{ url="$BASE/66e2a848f2c930af0735d713_Surveillance.svg"; dest="illustrations/surveillance.svg" },
  @{ url="$BASE/66e2a84899e1f69d420ae1d0_Photos.svg";       dest="illustrations/photos.svg" },
  @{ url="$BASE/66e2a848bbcf31fb30e4e0d5_Assurance.svg";    dest="illustrations/assurance.svg" },
  @{ url="$BASE/66e2a848ef56e7d8fca3dd7c_Veterinaire.svg";  dest="illustrations/veterinaire.svg" },
  @{ url="$BASE/66e2a848c7fae07ea786f56e_Socialisation.svg"; dest="illustrations/socialisation.svg" },
  @{ url="$BASE/66e2e32e5846c8d09f16088b_seedling.png";     dest="illustrations/seedling.png" },
  # Services page hero
  @{ url="$BASE/66c32d68e9c082e5790d0e27_Gardedenuit.png";   dest="illustrations/garde-nuit.png" },
  @{ url="$BASE/66d461f4aa224da55118655d_Tests%20DA-93.png";  dest="illustrations/hero-about.png" },
  @{ url="$BASE/66cf0c9a9a8a5ba6474ff5e0_Tests%20DA-95.png";  dest="illustrations/hero-petsitter.png" },

  # ── Blog article covers ──────────────────────────────────────────
  @{ url="$BLOG/697b3c43654f1b1ef4789681_Sans%20titre%20(532%20x%20358%20px)-27.png";  dest="illustrations/blog-cover-1.png" },
  @{ url="$BLOG/69f1f247cab7cc1704a7d97f_Couverture%20Articles%20de%20Blog-8.png";     dest="illustrations/blog-cover-8.png" },
  @{ url="$BLOG/69f1ed14d844a36509b43bc6_Couverture%20Articles%20de%20Blog-7.png";     dest="illustrations/blog-cover-7.png" },
  @{ url="$BLOG/69f1e7206cf0fb9b4423947d_Couverture%20Articles%20de%20Blog-5.png";     dest="illustrations/blog-cover-5.png" }
)

$client = [System.Net.Http.HttpClient]::new()
$client.DefaultRequestHeaders.Add("User-Agent", "Mozilla/5.0")

$jobs = $assets | ForEach-Object {
  $url  = $_.url
  $dest = Join-Path $OUT $_.dest
  [PSCustomObject]@{ Url=$url; Dest=$dest; Task=$client.GetByteArrayAsync($url) }
}

$ok=0; $fail=0
foreach ($j in $jobs) {
  try {
    $bytes = $j.Task.GetAwaiter().GetResult()
    [System.IO.File]::WriteAllBytes($j.Dest, $bytes)
    $ok++
    Write-Host "OK  $($j.Dest.Split('\')[-1])"
  } catch {
    $fail++
    Write-Host "ERR $($j.Url.Split('/')[-1].Substring(0,[Math]::Min(50,$j.Url.Split('/')[-1].Length))) — $_"
  }
}
$client.Dispose()
Write-Host "`n--- $ok downloaded, $fail failed ---"

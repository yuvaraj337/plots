import os
from PIL import Image

os.makedirs('public/images', exist_ok=True)

# 1. Logo
im_f5 = Image.open('reference/frames/frame_0005.jpg')
logo = im_f5.crop((205, 151, 415, 248))
logo.save('public/images/logo.png')

# 2. Hero Carousel Images
hero_apartments = Image.open('reference/frames/frame_0007.jpg').crop((925, 317, 1710, 792))
hero_apartments.save('public/images/hero-apartments.jpg')

hero_farmlands = Image.open('reference/frames/frame_0008.jpg').crop((925, 317, 1710, 792))
hero_farmlands.save('public/images/hero-farmlands.jpg')

hero_villas = Image.open('reference/frames/frame_0005.jpg').crop((925, 317, 1710, 792))
hero_villas.save('public/images/hero-villas.jpg')

hero_openplots = Image.open('reference/frames/frame_0010.jpg').crop((925, 317, 1710, 792))
hero_openplots.save('public/images/hero-openplots.jpg')

# 3. Category cards (from frame_0038)
im_f38 = Image.open('reference/frames/frame_0038.jpg')
im_f38.crop((280, 435, 587, 690)).save('public/images/cat-villas.jpg')
im_f38.crop((621, 435, 928, 690)).save('public/images/cat-openplots.jpg')
im_f38.crop((962, 435, 1269, 690)).save('public/images/cat-apartments.jpg')
im_f38.crop((1303, 435, 1610, 690)).save('public/images/cat-farmlands.jpg')

# 4. Featured properties (from frame_0027)
im_f27 = Image.open('reference/frames/frame_0027.jpg')
im_f27.crop((280, 218, 703, 335)).save('public/images/featured-silicon-valley.jpg')
im_f27.crop((736, 218, 1159, 335)).save('public/images/featured-sanjeevani.jpg')
im_f27.crop((1192, 218, 1615, 335)).save('public/images/featured-anvaya.jpg')

# 5. Open Plots Listing Images and Logos
im_f42 = Image.open('reference/frames/frame_0042.jpg')
im_f42.crop((220, 470, 925, 835)).save('public/images/plot-amodha.jpg')
im_f42.crop((230, 865, 420, 975)).save('public/images/logo-amodha.png')

im_f42.crop((970, 470, 1675, 835)).save('public/images/plot-fortune-avenue.jpg')
im_f42.crop((995, 875, 1150, 995)).save('public/images/logo-fortune-avenue.png')

im_f44 = Image.open('reference/frames/frame_0044.jpg')
im_f44.crop((220, 218, 925, 475)).save('public/images/plot-sez-city.jpg')
im_f44.crop((250, 500, 410, 580)).save('public/images/logo-sez-city.png')

im_f44.crop((970, 218, 1675, 475)).save('public/images/plot-shadnagar-heights.jpg')
im_f44.crop((1025, 505, 1150, 585)).save('public/images/logo-shadnagar-heights.png')

im_f45 = Image.open('reference/frames/frame_0045.jpg')
im_f45.crop((220, 222, 925, 588)).save('public/images/plot-vrindavan.jpg')
im_f45.crop((250, 620, 420, 715)).save('public/images/logo-vrindavan.png')

im_f45.crop((970, 222, 1675, 588)).save('public/images/plot-eeshanya-county.jpg')
im_f45.crop((1025, 625, 1130, 715)).save('public/images/logo-eeshanya-county.png')

# 6. Amodha Full Detail Image from frame 52
im_f52 = Image.open('reference/frames/frame_0052.jpg')
im_f52.crop((195, 315, 1220, 885)).save('public/images/plot-amodha-full.jpg')

print("Assets extracted and refined successfully!")

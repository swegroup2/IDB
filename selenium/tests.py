import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

    ##############
    ###HOMEPAGE###
    ##############

    # def test_home(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me")
    #     self.assertIn("Grey Poupon", driver.title)

    #     #check for navbar
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/nav")

    #     #check for header
    #     header = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/h1")
    #     self.assertIn("Welcome", header.text)

    #     #check for video
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/iframe")

    ################
    ###ABOUT PAGE###
    ################

    # def test_about(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me")
    #     button = driver.find_element_by_xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/a/div")
    #     button.click()
    #     self.assertEqual(driver.current_url, "https://poupon.me/about")
    #     cards = driver.find_elements_by_xpath("//*[@id=\"root\"]/div/div/div/div/div")
    #     self.assertEqual(len(cards), 6)
    #     time.sleep(5)
    #     status = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span")
    #     self.assertIn("Available", status.text)

    #############
    ###ARTISTS###
    #############

    # def test_artists_detail(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me")
    #     button = driver.find_element_by_xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[3]/a/div")
    #     button.click()
    #     self.assertEqual(driver.current_url, "https://poupon.me/artists", "On artists page")
    #     time.sleep(5)
    #     drake = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(drake.text, "Drake", "Checking that artists are sorted correctly")
    #     drake.click()
    #     self.assertEqual(driver.current_url, "https://poupon.me/artists/472", "On Drake's page")
    #     time.sleep(5)
    #     drake = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/div/h2")
    #     self.assertEqual(drake.text, "Drake", "Checking that the correct artist is displayed")
    
    # def test_artists_sorting(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me/artists")
    #     time.sleep(5)
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")

    #     #sort by least popular
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[2]").click()
    #     time.sleep(5)
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "Audio Push", "Checking that artists are sorted correctly")
        
    #     #sort by A-Z
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[3]").click()
    #     time.sleep(5)
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "21 Savage", "Checking that artists are sorted correctly")

    #     #sort by Z-A
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[4]").click()
    #     time.sleep(5)
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "Young Thug", "Checking that artists are sorted correctly")

    #     #sort by most popular
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[1]").click()
    #     time.sleep(5)
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "Drake", "Checking that artists are sorted correctly")

    # def test_artists_filtering(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me/artists")
    #     time.sleep(5)

    #     #filter by southern hip hop
    #     filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
    #     filter.click()
    #     time.sleep(1)
    #     select = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select")
    #     select.click()
    #     driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select/option[5]").click()
    #     apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
    #     apply.click()
    #     time.sleep(5)
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "Future", "Checking that artists are filtered correctly")

    #     #filter by dance pop
    #     filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
    #     filter.click()
    #     time.sleep(1)
    #     select = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select")
    #     select.click()
    #     driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select/option[9]").click()
    #     apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")        
    #     apply.click()
    #     time.sleep(5)
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "Justin Bieber", "Checking that artists are filtered correctly")

    #     #filter by all
    #     filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
    #     filter.click()
    #     time.sleep(1)
    #     select = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select")
    #     select.click()
    #     driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select/option[1]").click()
    #     apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
    #     apply.click()
    #     time.sleep(5)
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "Drake", "Checking that artists are filtered correctly")

    # def test_artists_paging(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me/artists")
    #     time.sleep(5)

    #     #check the first page
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "Drake", "Checking that artists are paged correctly")

    #     #check the second page
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/ul/li[3]/a").click()
    #     time.sleep(5)
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "Travis Scott", "Checking that artists are paged correctly")

    #     #go back and check the first again
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/ul/li[2]/a").click()
    #     time.sleep(5)
    #     artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(artist.text, "Drake", "Checking that artists are paged correctly")

    # def test_albums_detail(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me")
    #     button = driver.find_element_by_xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[4]/a/div")
    #     button.click()
    #     self.assertEqual(driver.current_url, "https://poupon.me/albums", "On albums page")
    #     time.sleep(5)

    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "17", "Checking that albums are sorted correctly")
    #     album.click()

    #     self.assertEqual(driver.current_url, "https://poupon.me/albums/3816", "On 17's page")
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/div/h2")
    #     self.assertEqual(album.text, "17", "Checking that the correct album is displayed")

    # def test_albums_sorting(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me/albums")
    #     time.sleep(5)
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")

    #     #sort by newest
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[2]").click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "Bugatti Raww", "Checking that albums are sorted correctly")
        
    #     #sort by oldest
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[3]").click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "Eazy-Duz-It", "Checking that albums are sorted correctly")

    #     #sort by least popular
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[4]").click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "100% Ginuwine", "Checking that albums are sorted correctly")

    #     #sort by least popular
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[5]").click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "100% Ginuwine", "Checking that albums are sorted correctly")

    #     #sort by least popular
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[6]").click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "Z", "Checking that albums are sorted correctly")

    #     #sort by most popular
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[1]").click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "17", "Checking that albums are sorted correctly")

    # def test_albums_filtering(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me/albums")
    #     time.sleep(5)

    #     #filter by southern hip hop
    #     filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
    #     filter.click()
    #     time.sleep(1)
    #     genre = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div[1]/select")
    #     genre.click()
    #     driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div[1]/select/option[5]").click()
    #     apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
    #     apply.click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "SUPER SLIMEY", "Checking that albums are filtered correctly")

    #     #filter by 2013 southern hip hop
    #     filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
    #     filter.click()
    #     time.sleep(1)
    #     year = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div[2]/select")
    #     year.click()
    #     driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div[2]/select/option[6]").click()
    #     apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
    #     apply.click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "Trap Lord", "Checking that albums are filtered correctly")

    #     #filter by 2013 albums
    #     filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
    #     filter.click()
    #     time.sleep(1)
    #     genre = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div[1]/select")
    #     genre.click()
    #     driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div[1]/select/option[1]").click()
    #     apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
    #     apply.click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "Born Sinner", "Checking that albums are filtered correctly")

    #     #filter by all
    #     filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
    #     filter.click()
    #     time.sleep(1)
    #     year = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div[2]/select")
    #     year.click()
    #     driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div[2]/select/option[1]").click()
    #     apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
    #     apply.click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "17", "Checking that albums are filtered correctly")

    # def test_albums_paging(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me/albums")
    #     time.sleep(5)

    #     #check the first page
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "17", "Checking that albums are paged correctly")

    #     #check the second page
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/ul/li[3]/a").click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "SUPER SLIMEY", "Checking that albums are paged correctly")

    #     #go back and check the first again
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/ul/li[2]/a").click()
    #     time.sleep(5)
    #     album = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
    #     self.assertEqual(album.text, "17", "Checking that albums are paged correctly")

    ##########
    ###NEWS###
    ##########

    # def test_news_detail(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me")
    #     button = driver.find_element_by_xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[5]/a/div")
    #     button.click()
    #     self.assertEqual(driver.current_url, "https://poupon.me/news", "On news page")
    #     time.sleep(5)

    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "KiD CuDi brings Out Kanye West @Chicago Show", "Checking that news is sorted correctly")
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/a[2]").click()

    #     self.assertEqual(driver.current_url, "https://poupon.me/news/1275", "On the article's page")
    #     time.sleep(5)
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div/div/div/div[2]/p[2]/h4")
    #     self.assertEqual(article.text, "KiD CuDi brings Out Kanye West @Chicago Show", "Checking that the correct article is displayed")


    # def test_news_sorting(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me/news")
    #     time.sleep(5)
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")

    #     #sort by oldest
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[2]").click()
    #     time.sleep(5)
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "Rick Ross wearing a Rick Ross chain wearing a Rick Ross chain", "Checking that articles are sorted correctly")
        
    #     #sort by most popular
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[3]").click()
    #     time.sleep(5)
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "[FRESH] Kendrick Lamar: \"Humble\" (Single)", "Checking that articles are sorted correctly")

    #     #sort by least popular
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[4]").click()
    #     time.sleep(5)
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "N.E.R.D. single supposedly premiering tomorrow on Zane Lowe's show", "Checking that articles are sorted correctly")

    #     #sort by newest
    #     sort = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select")
    #     sort.click()
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/select/option[1]").click()
    #     time.sleep(5)
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "KiD CuDi brings Out Kanye West @Chicago Show", "Checking that articles are sorted correctly")

    # def test_news_filtering(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me/news")
    #     time.sleep(5)

    #     #filter by itunes
    #     filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
    #     filter.click()
    #     time.sleep(1)
    #     media = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select")
    #     media.click()
    #     driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select/option[3]").click()
    #     apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
    #     apply.click()
    #     time.sleep(5)
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "[FRESH] Big Sean & Metro Boomin - Pull Up N Wreck (feat. 21 Savage)", "Checking that articles are filtered correctly")

    #     #filter by reddit
    #     filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
    #     filter.click()
    #     time.sleep(1)
    #     media = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select")
    #     media.click()
    #     driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select/option[5]").click()
    #     apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
    #     apply.click()
    #     time.sleep(5)
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "N*E*R*D allegedly claims full album to be released tonight at concert, including confirmed features from Kendrick, Future, Gucci & more.", "Checking that articles are filtered correctly")


    # def test_albums_paging(self):
    #     driver = self.driver
    #     driver.get("https://poupon.me/news")
    #     time.sleep(5)

    #     #check the first page
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "KiD CuDi brings Out Kanye West @Chicago Show", "Checking that articles are paged correctly")

    #     #check the second page
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/ul/li[3]/a").click()
    #     time.sleep(5)
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "Juicy J - Intro (Prod. by $UICIDEBOY$)", "Checking that articles are paged correctly")

    #     #go back and check the first again
    #     driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/ul/li[2]/a").click()
    #     time.sleep(5)
    #     article = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div/div/div[2]/p[2]/h5/span")
    #     self.assertEqual(article.text, "KiD CuDi brings Out Kanye West @Chicago Show", "Checking that articles are paged correctly")

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
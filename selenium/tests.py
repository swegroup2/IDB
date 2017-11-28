import unittest
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class PythonOrgSearch(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()

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

    def test_artists_filtering(self):
        driver = self.driver
        driver.get("https://poupon.me/artists")
        time.sleep(5)

        #filter by southern hip hop
        filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
        filter.click()
        time.sleep(1)
        select = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select")
        select.click()
        driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select/option[5]").click()
        apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
        apply.click()
        time.sleep(5)
        artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
        self.assertEqual(artist.text, "Future", "Checking that artists are filtered correctly")

        #filter by dance pop
        filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
        filter.click()
        time.sleep(1)
        select = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select")
        select.click()
        driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select/option[9]").click()
        apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")        
        apply.click()
        time.sleep(5)
        artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
        self.assertEqual(artist.text, "Justin Bieber", "Checking that artists are filtered correctly")

        #filter by all
        filter = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[1]/div/div/span/button")
        filter.click()
        time.sleep(1)
        select = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select")
        select.click()
        driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[2]/div/select/option[1]").click()
        apply = driver.find_element_by_xpath("//*[@id=\"filterModal\"]/div/div/div[3]/button[2]")
        apply.click()
        time.sleep(5)
        artist = driver.find_element_by_xpath("//*[@id=\"root\"]/div/div/div/div/div[2]/div/div[2]/h4/a")
        self.assertEqual(artist.text, "Drake", "Checking that artists are filtered correctly")


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
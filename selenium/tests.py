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

    def test_about(self):
        driver = self.driver
        driver.get("https://poupon.me")
        button = driver.find_element_by_xpath("//*[@id=\"navbarSupportedContent\"]/ul/li[2]/a/div")
        button.click()
        self.assertEqual(driver.current_url, "https://poupon.me/about")
        cards = driver.find_elements_by_xpath("//*[@id=\"root\"]/div/div/div/div/div")
        self.assertEqual(len(cards), 6)

    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()
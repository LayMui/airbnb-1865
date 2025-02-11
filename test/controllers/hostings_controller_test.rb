require "test_helper"

class HostingsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get hostings_index_url
    assert_response :success
  end
end

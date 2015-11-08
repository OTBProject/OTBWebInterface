class DashboardController < ApplicationController

  def user_levels
    render :json => %w(DEFAULT SUBSCRIBER REGULAR MODERATOR SUPER_MODERATOR BROADCASTER INTERNAL).reverse!.to_json
  end

  def index
    Dir.chdir ::DIR_BASE
    @channels = []
    Dir.foreach ::DIR_BASE+'/data/channels' do |item|
      next if item == '.' or item=='..'
      @channels << item
    end
    @channels.sort!
  end

end
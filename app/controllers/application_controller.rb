class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :setup_database, :check_auth

  def setup_database
    unless params[:channel].nil?
      ActiveRecord::Base.establish_connection adapter: 'sqlite3', database: "#{::DIR_BASE}/data/channels/#{params[:channel]}/main.db"
    end
  end

  def check_auth
    file = File.read("#{::DIR_BASE}/config/web-config.json")
    data = JSON.parse file
    ip_addresses_with_prefix = data['writableWhitelist'].to_a
    ip_addresses_with_prefix.each do |i|
      ip = IPAddr.new i
      if ip.include? request.remote_ip
        session[:auth] = 'auth token'
        return
      end
    end
    session[:auth] = nil
  end

end
